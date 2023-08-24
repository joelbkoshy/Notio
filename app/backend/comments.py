from itertools import islice
from youtube_comment_downloader import *
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from nltk.sentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
sid = SentimentIntensityAnalyzer()

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def comments(data):
    popular = []
    downloader = YoutubeCommentDownloader()
    comments = downloader.get_comments_from_url(data, sort_by=SORT_BY_POPULAR)
    for comment in islice(comments, 1000):
        popular.append(comment)
    return popular

def analyze_comment(comment):
    print("Comment : ",comment)
    sentiment_scores = sid.polarity_scores(comment)
    sentiment = sentiment_scores['compound']
    print("sentiment : ",sentiment)
    if sentiment >= 0.5:
        sentiment='Very Positive'
    elif sentiment >= 0.05:
        sentiment='Positive'
    elif sentiment <= -0.5:
        sentiment='Negative'
    elif sentiment <= -0.05:
        sentiment='Very Negative'
    else:
        sentiment='Neutral'
    return sentiment

@app.route('/scrape', methods=['POST'])
@cross_origin()
def start_scraping():
    if request.method == 'POST':
        try:
            data = request.get_json()["link"]
            print("link: ", data)
            if data.startswith("https://www.youtube.com/"):
                scraped_comments = comments(data)
                sentiment_counts = {
                    'Very Negative': 0,
                    'Negative': 0,
                    'Neutral': 0,
                    'Positive': 0,
                    'Very Positive': 0,
                }
                analyzed_comments=[]
                for comment in scraped_comments:
                    comment["sentiment"]=analyze_comment(comment["text"])
                    sentiment_counts[comment["sentiment"]] += 1
                    analyzed_comments.append(comment)
                # print(analyzed_comments)
                response_data = {
                    'comments': analyzed_comments,
                    'sentimentCounts': sentiment_counts
                }
                # return jsonify(comments=analyzed_comments)
                return jsonify(response_data)
            else:
                return jsonify(error="Invalid YouTube URL")
        except Exception as e:
            return jsonify(error="Invalid request or other error")

if __name__ == '__main__':
    print("App running at port 8000")
    app.run(debug=True,port=8000)
