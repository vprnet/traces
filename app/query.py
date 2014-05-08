#!/usr/bin/python
import Image
import ImageOps
import urllib
import os
import re
from unicodedata import normalize
from cStringIO import StringIO
from google_spreadsheet.api import SpreadsheetAPI
from config import ABSOLUTE_PATH, GOOGLE_SPREADSHEET


def list_sheets():
    """The API sheet_key is not the same as the key in the URL. This function
    just prints out all sheet keys"""
    api = SpreadsheetAPI(GOOGLE_SPREADSHEET['USER'],
        GOOGLE_SPREADSHEET['PASSWORD'],
        GOOGLE_SPREADSHEET['SOURCE'])
    spreadsheets = api.list_spreadsheets()
    for sheet in spreadsheets:
        print sheet


def get_google_sheet(sheet_key='1WnJL3lpsFjJIv6yM0ruA-k5YnroaxKtiFRrJNOFP84s', sheet_id='od6'):
    """Uses python_google_spreadsheet API to interact with sheet"""
    api = SpreadsheetAPI(GOOGLE_SPREADSHEET['USER'],
        GOOGLE_SPREADSHEET['PASSWORD'],
        GOOGLE_SPREADSHEET['SOURCE'])
    sheet = api.get_worksheet(sheet_key, sheet_id)
    sheet_object = sheet.get_rows()
    return sheet_object


def generate_thumbnail(image_url, preserve_ratio=False, size=(220, 165)):
    """Take an image src, generate a thumbnail, return new path"""

    filename = image_url.rsplit('/', 1)[1]
    path_to_read = 'img/thumbnails/' + filename
    path_to_save = ABSOLUTE_PATH + 'static/' + path_to_read

    if not os.path.isfile(path_to_save):
        img_file = urllib.urlopen(image_url)
        img = StringIO(img_file.read())
        image = Image.open(img)
        if preserve_ratio:
            width = image.size[0]
            height = image.size[1]
            new_height = size[0] * height / width
            size = (size[0], new_height)
        im = ImageOps.fit(image, size, Image.ANTIALIAS)
        im.save(path_to_save)

    return path_to_read


def slugify(text, delim=u'-'):
    """Generates a slightly worse ASCII-only slug."""
    _punct_re = re.compile(r'[\t !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.]+')
    result = []
    for word in _punct_re.split(text.lower()):
        word = normalize('NFKD', word).encode('ascii', 'ignore')
        if word:
            result.append(word)
    return unicode(delim.join(result))


def get_submission(title):
    all_submissions = get_google_sheet()
    matched = False
    for submission in all_submissions:
        if title == slugify(unicode(submission['title'])):
            matched = submission
            matched['slug'] = title
    return matched


def get_slugs(title):
    all_submissions = get_google_sheet()
    slugs = [slugify(unicode(i['title'])) for i in all_submissions]

    links = False
    for i in range(len(slugs)):
        if title == slugs[i]:
            next = False
            prev = False
            if i + 1 < len(slugs):
                next = slugs[i + 1]
            if i > 0:
                prev = slugs[i - 1]

            links = {'next': next, 'prev': prev}

    return slugs, links
