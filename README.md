## 2d3d
A fun project for my friend. The data from the stock website is scraped and make processing to get the numbers **(I don't want to say what is it, trust you gut)**.

**API references**

1. To add a 3d data 
    - HTTP POST request on `https://asia-east2-d3d-66582.cloudfunctions.net/api/add3d`
    - with JSON body `{ "digit": ":number", "dayago": ":number" }`
    - where
        - replace `:number` with data you want to add
        - `dayago` is the number of days before now 
        > for example: 1 for yesterday
        - parameter `dayago` can be left

2. To get all 3ds data
    - HTTP GET request on `https://asia-east2-d3d-66582.cloudfunctions.net/api/get3ds`
