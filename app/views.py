from index import app
from flask import render_template, request
from config import BASE_URL
from query import get_submission, get_slugs, get_social

social = {
    'title': "Traces: A VPR Project",
    'subtitle': "",
    'img': "http://www.vpr.net/apps/traces/static/img/vpr-traces-social-image.jpg",
    'description': "Drug addiction affects many in the Vermont community. Traces is an attempt to catalog the memories and feelings of Vermonters affected by addiction, and an exploration of the deep and subtle ways that addiction leaves its mark.",
    'twitter_text': "VPR is exploring the deep and subtle ways that drug addiction in Vermont leaves its mark.",
    'twitter_hashtag': "VT, VtTraces"
}


@app.route('/')
def index():
    page_url = BASE_URL + request.path
    page_url = page_url.strip('/')
    page_title = 'Traces: What Reminds You?'
    slugs, links = get_slugs(title=False)
    x, next_trace = get_submission(title=False)
    slugs, links = get_slugs(title=False)
    submission = {'slug': 'landing'}
    next_social, unused = get_social(title=next_trace['slug'])

    next_trace['social'] = {
        'title': next_social['facebooktitle'],
        'subtitle': next_social['facebooksubtitle'],
        'img': next_social['facebookimage'],
        'description': next_social['facebookdescription'],
        'twitter_text': next_social['twittertext'],
        'twitter_hashtag': "VT,VtTraces"
    }

    return render_template('index.html',
        submission=submission,
        next_trace=next_trace,
        slugs=slugs,
        links=links,
        page_title=page_title,
        social=social,
        page_url=page_url)


@app.route('/share')
def share():
    page_url = BASE_URL + request.path
    navbar_h1 = True
    page_title = 'TRACES: Share Your Story'
    x, next_trace = get_submission(title=False)
    submission = {'slug': 'share'}
    slugs, links = get_slugs(title=False)
    next_social, unused = get_social(title=next_trace['slug'])

    share_social = {
        'title': "VPR's Traces Project: Share Your Story",
        'subtitle': "",
        'img': "http://www.vpr.net/apps/traces/static/img/vpr-traces-social-image.jpg",
        'description': "Traces is an attempt to catalog how drug addiction affects us, and how we think about it: loss, anger, confusion -- and sometimes hope. What's your story?",
        'twitter_text': "Drug addiction affects many in the Vermont community. What's your story?",
        'twitter_hashtag': "VT, VtTraces"
    }

    next_trace['social'] = {
        'title': next_social['facebooktitle'],
        'subtitle': next_social['facebooksubtitle'],
        'img': next_social['facebookimage'],
        'description': next_social['facebookdescription'],
        'twitter_text': next_social['twittertext'],
        'twitter_hashtag': "VT,VtTraces"
    }

    return render_template('index.html',
        submission=submission,
        next_trace=next_trace,
        slugs=slugs,
        links=links,
        page_title=page_title,
        share_social=share_social,
        social=social,
        navbar_h1=navbar_h1,
        page_url=page_url)


@app.route('/<title>')
def post(title):
    page_url = BASE_URL
    navbar_h1 = True
    page_title = 'TRACES: What Reminds You?'
    submission, next_trace = get_submission(title)
    slugs, links = get_slugs(title)
    this_social, next_social = get_social(title=submission['slug'])

    submission['social'] = {
        'title': this_social['facebooktitle'],
        'subtitle': this_social['facebooksubtitle'],
        'img': this_social['facebookimage'],
        'description': this_social['facebookdescription'],
        'twitter_text': this_social['twittertext'],
        'twitter_hashtag': "VT,VtTraces"
    }

    if next_trace:
        next_trace['social'] = {
            'title': next_social['facebooktitle'],
            'subtitle': next_social['facebooksubtitle'],
            'img': next_social['facebookimage'],
            'description': next_social['facebookdescription'],
            'twitter_text': next_social['twittertext'],
            'twitter_hashtag': "VT,VtTraces"
        }

    return render_template('submission.html',
        page_title=page_title,
        navbar_h1=navbar_h1,
        submission=submission,
        social=social,
        slugs=slugs,
        links=links,
        next_trace=next_trace,
        page_url=page_url)


@app.route('/your-story')
def your_story():
    page_url = BASE_URL + request.path
    navbar_h1 = True
    page_title = 'TRACES: Share Your Story'
    x, next_trace = get_submission(title=False)
    submission = {'slug': 'your-story'}
    slugs, links = get_slugs(title=False)
    next_social, unused = get_social(title=next_trace['slug'])

    share_social = {
        'title': "VPR's Traces Project: Share Your Story",
        'subtitle': "",
        'img': "http://www.vpr.net/apps/traces/static/img/vpr-traces-social-image.jpg",
        'description': "Traces is an attempt to catalog how drug addiction affects us, and how we think about it: loss, anger, confusion -- and sometimes hope. What's your story?",
        'twitter_text': "Drug addiction affects many in the Vermont community. What's your story?",
        'twitter_hashtag': "VT, VtTraces"
    }

    next_trace['social'] = {
        'title': next_social['facebooktitle'],
        'subtitle': next_social['facebooksubtitle'],
        'img': next_social['facebookimage'],
        'description': next_social['facebookdescription'],
        'twitter_text': next_social['twittertext'],
        'twitter_hashtag': "VT,VtTraces"
    }

    return render_template('index.html',
        submission=submission,
        next_trace=next_trace,
        slugs=slugs,
        links=links,
        page_title=page_title,
        share_social=share_social,
        social=social,
        navbar_h1=navbar_h1,
        page_url=page_url)
