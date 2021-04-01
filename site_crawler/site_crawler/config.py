from pathlib import Path

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

#OUTPUT_PATH = Path(Path.cwd(), "crawler_output")
OUTPUT_PATH = Path(Path.cwd(), "crawler_sitemap_output")


SITEMAP_CONFIG = {
    'directory_prefix': "127_0_0_1",
    'sitemap_urls': [
        'http://127.0.0.1:8000/sitemap.xml',
    ]
}

