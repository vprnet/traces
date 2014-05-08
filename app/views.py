from index import app
from flask import render_template, request
from config import BASE_URL
from query import get_submission, get_slugs


@app.route('/')
def index():
    page_url = BASE_URL + request.path
    page_title = 'Traces: What Reminds You'
    slugs, links = get_slugs(title=False)

    social = {
        'title': "Traces: Share Your Story",
        'subtitle': "",
        'img': "http://www.vpr.net/apps/traces/static/img/vpr-traces-social-image.jpg",
        'description': "When you've lost - or lost touch with - a relative or friend because of drug addiction, reminders of that person can be anywhere. Help VPR build a collection of those reminders and the memories they evoke.",
        'twitter_text': "Have you lost - or lost touch with - someone because of drug addiction? Share your story:",
        'twitter_hashtag': "VT, VtTraces"
    }

    return render_template('landing.html',
        page_title=page_title,
        social=social,
        slugs=slugs,
        page_url=page_url)


@app.route('/share')
def share():
    page_url = BASE_URL + request.path
    navbar_h1 = True
    page_title = 'TRACES: Share Your Story'

    social = {
        'title': "Traces: Share Your Story",
        'subtitle': "",
        'img': "http://www.vpr.net/apps/traces/static/img/vpr-traces-social-image.jpg",
        'description': "When you've lost - or lost touch with - a relative or friend because of drug addiction, reminders of that person can be anywhere. Help VPR build a collection of those reminders and the memories they evoke.",
        'twitter_text': "Have you lost - or lost touch with - someone because of drug addiction? Share your story:",
        'twitter_hashtag': "VT, VtTraces"
    }

    return render_template('share.html',
        page_title=page_title,
        social=social,
        navbar_h1=navbar_h1,
        page_url=page_url)


@app.route('/<title>')
def post(title):
    page_url = BASE_URL + request.path
    navbar_h1 = True
    page_title = 'TRACES: What Reminds You?'
    submission = get_submission(title)
    slugs, links = get_slugs(title)

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('submission.html',
        page_title=page_title,
        social=social,
        navbar_h1=navbar_h1,
        submission=submission,
        slugs=slugs,
        links=links,
        page_url=page_url)
