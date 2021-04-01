from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

from slugify import slugify


from .config import OUTPUT_PATH


def create_result_directory(site):
    timestamp = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
    source_dir = Path(OUTPUT_PATH, f"{site}-{timestamp}")
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