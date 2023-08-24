import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import BarChart from './BarChart';


type dp = {
  label: string,
  value: number
}

const YouTube = () => {

  const [link, setLink] = useState(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sentimentCounts, setSentimentCounts] = useState({
    'Very Negative': 0,
    'Negative': 0,
    'Neutral': 0,
    'Positive': 0,
    'Very Positive': 0,
  });

  const [dataPoints,setDataPoints] = useState<dp[]>([]);
   
  const [submit, setSubmit] = useState<boolean>(false);

  let DataPoint: dp[] = []





  const handleSetLink = (e: any) => {
    setLink(e.target.value)
  }


  const handleSubmit = () => {
    setSentimentCounts({
      'Very Negative': 0,
      'Negative': 0,
      'Neutral': 0,
      'Positive': 0,
      'Very Positive': 0,
    })
    const apiUrl = 'http://localhost:8000/scrape';

    setLoading(true); // Start loading indicator
    axios.post(apiUrl, { link })
      .then(response => {
        console.log("the response : ", response)
        setData(response.data?.comments);
        setSentimentCounts(response.data?.sentimentCounts)
      })
      .catch(error => {
        console.error('Error posting data:', error);
      })
      .finally(() => {
        setLoading(false); // Stop loading indicator
      });
  };

  useEffect(() => {

    const updatedDataPoints = Object.entries(sentimentCounts).map(([label,value])=>({
      label,
      value
    }))
     setDataPoints(updatedDataPoints)

    }, [ sentimentCounts])




  const columns = [
    { field: 'sno', headerName: 'S.no', width: 90 },
    {
      field: 'author',
      headerName: 'Author',
      width: 180,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={params.row.photo} alt="" style={{ borderRadius: '100%', width: 30, marginRight: 2 }} />
          {params.row.author.substring(1)}
        </div>
      ),
    },
    { field: 'text', headerName: 'Text', width: 300 },
    { field: 'votes', headerName: 'Votes', width: 100 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'sentiment', headerName: 'Sentiment', width: 150 },
  ];

  const rows = data
    ? data.map((comment, index) => ({
      id: index,
      sno: index + 1,
      author: comment.author,
      photo: comment.photo,
      text: comment.text,
      votes: comment.votes,
      time: comment.time,
      sentiment: comment.sentiment,
    }))
    : [];


    console.log("The dataPoints : ",dataPoints)

  return (
    <div className='youtube-container'>
      <div className='youtube-input'>
        <h3>Analyze youtube videos</h3>
        <div className='youtube-input-main'>
          <input type="text" onChange={(e) => handleSetLink(e)} />
          <button onClick={() => {
            handleSubmit();
            setSubmit(true)
          }}>Analyze</button>
        </div>
      </div>
      <div>
        <div className='result-section'>
          {loading ? (
            <CircularProgress />
          ) : data && data.length ? (
            <>
              < div style={{ height: 400, width: '100%', alignItems: "center", display: 'flex', justifyItems: 'center' }}>
                <DataGrid rows={rows} columns={columns} />
              </div>
            </>
          ) : null

          }
          {
            submit && !loading ?

              <div className='result-section-main'>
                <div className='result-section-list'>
                  <li>
                    <span>Very Negative : {sentimentCounts?.['Very Negative']}</span>
                  </li>
                  <li>
                    <span>Negative : {sentimentCounts?.['Negative']}</span>
                  </li>
                  <li>
                    <span>Neutral : {sentimentCounts?.['Neutral']}</span>
                  </li>
                  <li>
                    <span>Positive : {sentimentCounts?.['Positive']}</span>
                  </li>
                  <li>
                    <span>Very Positive : {sentimentCounts?.['Very Positive']}</span>
                  </li>
                </div>
                  <BarChart data={dataPoints} />
              </div>
              :
              <>
              </>

          }
        </div>
      </div>
    </div>
  )
}

export default YouTube