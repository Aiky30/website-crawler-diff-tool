import scrapy

from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

from slugify import slugify

from scrapy.linkextractors import LinkExtractor


# TODO: Find a more plugable way to add a site config per site run
SITE_CONFIG = {
    'allowed_domains': [
        '127.0.0.1'
    ],
    'start_urls': [
        'http://127.0.0.1:8000'
    ],
    'directory_prefix': '127_0_0_1',
}


def create_result_directory(site):
    timestamp = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
    file_root_path = Path(Path.cwd(), "crawler_output")

    source_dir = Path(file_root_path, f"{site}-{timestamp}")
    source_dir.mkdir()
    return source_dir


def generate_filename_from_url(url):
    # Create a filename
    parsed_url = urlparse(url)
    cleaned_url = slugify(parsed_url.path)
    return f"{cleaned_url}.html"


def write_to_file(directory, url, contents):
    filename = generate_filename_from_url(url)
    path = Path(directory, filename)

    # Write to the file
    with open(path, 'wb') as f:
        f.write(contents)


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
