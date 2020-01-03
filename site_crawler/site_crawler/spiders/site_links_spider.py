import scrapy
from datetime import datetime
from pathlib import Path

from scrapy.linkextractors import LinkExtractor
from slugify import slugify


# Generate a directory
timestamp = datetime.now().timestamp()
file_root_path = source_dir = Path(Path.cwd(), "crawler_output")
source_dir = Path(file_root_path, "127.0.0.1-{}".format(timestamp))
source_dir.mkdir()


def write_to_file(filename, contents):
    # Create a filename
    filename = slugify(filename)
    filename = "{filename}.html".format(filename=filename)

    path = Path(source_dir, filename)

    # Write to the file
    with open(path, 'wb') as f:
        f.write(contents)


class SiteLinksSpider(scrapy.Spider):
    name = 'site_links'
    allowed_domains = [
        '127.0.0.1'
    ]
    start_urls = [
        'http://127.0.0.1:8000/'
    ]

    def parse(self, response):
        page_links = LinkExtractor().extract_links(response)

        yield {
            'url': response.url
        }

        # Write the parsed file out
        write_to_file(response.url, response.body)

        for page_link in page_links:
            # CAREFUL: yield scrapy.Request(page_link.url, callback=self.parse, dont_filter=True, headers={('User-Agent', 'Mozilla/5.0')})
            yield response.follow(page_link.url, self.parse)
