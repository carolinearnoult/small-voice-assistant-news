import React, { useEffect, useState } from 'react';
import { getNews } from '../Service/getNews';
import moment from 'moment';
import alanBtn from "@alan-ai/alan-sdk-web";

export default function NewsData() {
    const [newsData, setNewsData] = useState([]);
    const alanKey = `8cfdcdee81290bd86a64010e463b7f0e2e956eca572e1d8b807a3e2338fdd0dc/stage`
    const [selectOption, setSelectOption] = useState('');
    const getAllNews = async () => {
        let data = await getNews(selectOption);
        setNewsData(data.data.articles)
    }

    const selectCategory = (event) => {
      setSelectOption(event.target.value);
    }

      useEffect(() => {
        alanBtn({
          key: alanKey,
          onCommand: (commandData) => {
            setSelectOption(commandData.data);
          },
        });
      }, []);

    useEffect(() => {
      getAllNews();
    }, [selectOption]); 
  return (
    <div className="main">
      <h1>News Assistant Vocal</h1>
      <div className="select">
        <label for="cars">Choose a Category: </label>

        <select
          className="select-box"
          name="category"
          id="category"
          onChange={selectCategory}
          value={selectOption}
        >
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
        </select>
      </div>
      <div className="grid-main">
        {newsData?.map((news) => {
          return (
            <div className="grid-child">
              <img className="news-image" src={news?.urlToImage} />
              <p className="news-title">{news?.title}</p>
              <p className="news-content">{news?.content}</p>
              <div className="space-btw">
                <p className="news-author">
                  {news?.author ? news?.author : "Author name not available"}
                </p>
                <p className="news-date">
                  {moment(news?.publishedAt).format("LL")}
                </p>
              </div>

              <a href={news?.url} target="_blank">
                Read More...
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
