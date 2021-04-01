import scrapy

from scrapy.spiders import SitemapSpider

from site_crawler.config import SITEMAP_CONFIG
from site_crawler.utils import create_result_directory, generate_filename_from_url, write_to_file


class SiteMapSpider(SitemapSpider):
    name = 'sitemap'
    sitemap_urls = SITEMAP_CONFIG['sitemap_urls']
    login_page = "http://127.0.0.1:8000/en/login/"

    def __init__(self, *args, **kwargs):
        self.result_directory = create_result_directory(SITEMAP_CONFIG['directory_prefix'])
        super().__init__(self, *args, **kwargs)

    def start_requests(self):
        yield scrapy.Request(url=self.login_page, callback=self.login)

        for url in self.sitemap_urls:
            yield scrapy.Request(url, self._parse_sitemap)

    def login(self, response):
        """Generate a login request."""
        return scrapy.FormRequest.from_response(response,
                    formdata={'name': 'admin', 'password': 'admin'},
                    callback=self.check_login_response)

    def check_login_response(self, response):
        """Check the response returned by a login request to see if we are
        successfully logged in.
        """
        if "Hi" in str(response.body):
            self.log("Successfully logged in. Let's start crawling!")
            # Now the crawling can begin..
            return self.initialized()
        else:
            self.log("Bad times :(")
            # Something went wrong, we couldn't log in, so nothing happens.

    def parse(self, response):

        print(response.url)

        return

        # write_to_file(self.result_directory, response.url, response.body)
