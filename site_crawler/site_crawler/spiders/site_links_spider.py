import scrapy

from scrapy.linkextractors import LinkExtractor

from site_crawler.config import SITE_CONFIG
from site_crawler.utils import create_result_directory, generate_filename_from_url, write_to_file


class SiteLinksSpider(scrapy.Spider):
    name = 'site_links'
    allowed_domains = SITE_CONFIG.get('allowed_domains')
    start_urls = SITE_CONFIG.get('start_urls')

    def __init__(self, *args, **kwargs):
        self.result_directory = create_result_directory(SITE_CONFIG.get('directory_prefix'))
        super().__init__(self, *args, **kwargs)

    def parse(self, response):
        page_links = LinkExtractor().extract_links(response)

        yield {
            'url': response.url
        }

        # Write the parsed file out
        write_to_file(self.result_directory, response.url, response.body)

        for page_link in page_links:
            # CAREFUL: yield scrapy.Request(page_link.url, callback=self.parse, dont_filter=True, headers={('User-Agent', 'Mozilla/5.0')})
            yield response.follow(page_link.url, self.parse)
