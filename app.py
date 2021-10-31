from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/projects")
def projects():
    websites = [
        {
            "name": "Grant F Barnes",
            "desc": "This website. A Python Flask site with no imported javascript frameworks or css styling.",
            "url": "http://grantfbarnes.net/",
            "source": "https://github.com/grantfbarnes/home-page"
        },
        {
            "name": "Learn Vietnamese",
            "desc": "A Node.js and Angular site used to learn Vietnamese using flashcards, quizes, and sound.",
            "url": "http://vietnamese.grantfbarnes.net/",
            "source": "https://github.com/grantfbarnes/learn-vietnamese"
        },
        {
            "name": "Tractor Pulling",
            "desc": "A Node.js and React site used to view results from the Community Antique Tractor Pullers.",
            "url": "http://catp.grantfbarnes.net/",
            "source": "https://github.com/grantfbarnes/tractor-pulling"
        }
    ]
    return render_template("projects.html", websites=websites)


@app.route("/social")
def social():
    links = [
        {
            "name": "GitHub",
            "desc": "My GitHub page has source code to any side projects I work on.",
            "url": "https://github.com/GrantFBarnes"
        },
        {
            "name": "Linked In",
            "desc": "My Linked In profile which shows my job history.",
            "url": "https://www.linkedin.com/in/grant-f-barnes"
        },
        {
            "name": "YouTube",
            "desc": "My YouTube channel, mostly consisting of tractor videos.",
            "url": "https://www.youtube.com/c/grantbarnes"
        }
    ]
    return render_template("social.html", links=links)
