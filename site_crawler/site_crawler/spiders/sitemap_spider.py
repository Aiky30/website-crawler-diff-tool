from scrapy.spiders import SitemapSpider

from site_crawler.config import SITEMAP_CONFIG
from site_crawler.utils import create_result_directory, generate_filename_from_url, write_to_file


class SiteMapSpider(SitemapSpider):
    name = 'sitemap'
    sitemap_urls = SITEMAP_CONFIG['sitemap_urls']

    def __init__(self, *args, **kwargs):
        self.result_directory = create_result_directory(SITEMAP_CONFIG['directory_prefix'])
        super().__init__(self, *args, **kwargs)

    def parse(self, response):
        # Write the parsed file out
        write_to_file(self.result_directory, response.url, response.body)
