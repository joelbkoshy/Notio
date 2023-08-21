import random
from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
import re


MIN_DELAY = 2  
MAX_DELAY = 5

final=[]

# brave_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"

# Specify the path to the downloaded ChromeDriver executable
# chrome_driver_path = "D:/chromedriver-win64/chromedriver-win64/chromedriver.exe"

# Set up options to use Brave browser
# options = webdriver.ChromeOptions()
# options.binary_location = brave_path

# Initialize the WebDriver instance with the options
# driver = webdriver.Chrome(options=options)
driver = webdriver.Chrome()
driver.maximize_window()
driver.get("https://www.youtube.com")
# driver.implicitly_wait(10)

app = Flask(__name__)

def scroll_to_end():
    # print(current_scroll_position)
    length=101
    count=2
    while True:
        driver.find_element(By.TAG_NAME,'body').send_keys(Keys.PAGE_DOWN)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'count-teext')))
        time.sleep(0.5)  # Adjust the sleep time as needed to control the scrolling speed.
        if(count==2):
            length=driver.find_element(By.CLASS_NAME,"count-text")
            length=length.text
            print("The place it broke off : ",length)
            length=int(re.sub(r',', '', length.split()[0]))
            print("Length of comments : ",length)
        comments = driver.find_elements(By.CLASS_NAME, "style-scope ytd-comment-renderer")
        i=0
        j="t"
        final=[]
        for comment in comments:
         comString = comment.find_elements(By.ID, 'content-text')
         for com in comString:
          i=i+1
          final.append(com.text)
          count+=1
          j="f"
        if(j=="t"):
           final.append(" ")
        if(length<=len(final) or len(final)>=100):
           print(final)
           break
    return final    

def scrape_data(link):
    driver.get(link)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
    
    # Introduce a delay before continuing
    time.sleep(6)
    
    # Rest of your scraping code
    
    final=scroll_to_end()
    
    # Introduce another delay after the scraping action
    delay = random.uniform(MIN_DELAY, MAX_DELAY)
    time.sleep(delay)

    
    return final


@app.route('/scrape', methods=['POST'])
def start_scraping():
    if request.method == 'POST':
        data = request.get_json()["link"]
        print("link  : ",data)
        data=scrape_data(data)
        return jsonify(data)
    

if __name__ == '__main__':
    print("app running at port 8000")
    app.run(port=8000)