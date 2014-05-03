from index import app
from flask import render_template, request
from config import BASE_URL


@app.route('/')
def index():
    page_url = BASE_URL + request.path
    page_title = 'Traces: What Reminds You'

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


@app.route('/photo')
def photo():
    page_url = BASE_URL + request.path
    navbar_h1 = True
    page_title = 'TRACES: What Reminds You?'

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('photo.html',
        page_title=page_title,
        social=social,
        navbar_h1=navbar_h1,
        page_url=page_url)


@app.route('/text')
def text():
    page_url = BASE_URL + request.path
    navbar_h1 = True
    page_title = 'TRACES: What Reminds You?'

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('text.html',
        page_title=page_title,
        social=social,
        navbar_h1=navbar_h1,
        page_url=page_url)
