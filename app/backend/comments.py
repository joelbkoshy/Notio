from itertools import islice
from youtube_comment_downloader import *
downloader = YoutubeCommentDownloader()
comments = downloader.get_comments_from_url('https://www.youtube.com/watch?v=Ow4J5nxJ388', sort_by=SORT_BY_POPULAR)
for comment in islice(comments, 100):
    print(comment)