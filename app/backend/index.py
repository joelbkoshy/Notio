from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time


driver = webdriver.Chrome()
driver.maximize_window()
# driver.implicitly_wait(10)

app = Flask(__name__)

def scroll_to_end():
    # Scroll down using Keys.PAGE_DOWN until the bottom of the page is reached.
    while True:
        driver.find_element_by_tag_name('body').send_keys(Keys.PAGE_DOWN)
        time.sleep(0.5)  # Adjust the sleep time as needed to control the scrolling speed.

        # Check if we have reached the end of the page.
        current_scroll_position = driver.execute_script("return window.pageYOffset;")
        new_scroll_position = driver.execute_script("window.scrollTo(0, document.body.scrollHeight); return window.pageYOffset;")
        if new_scroll_position == current_scroll_position:
            break

def scrape_data(link):
    driver.get(link)

    # Wait for the page to load completely
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))

    # Scroll asynchronously to the bottom of the page
    scroll_to_end(driver)

    # Note: You can perform additional scraping actions here

    # Close the browser
    driver.quit()

@app.route('/scrape', methods=['POST'])
def start_scraping():
    if request.method == 'POST':
        data = request.get_json()["link"]
        scrape_data(data)
        return jsonify({'message': 'Scraping completed'})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
