import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Type from '../components/Type';
import BarChart from '../components/BarChart';
import ImageSwitcher from '../components/ImageSwitcher';
import SideBar from '../components/SideBar';


const HomePage = () => {
  const [link, setLink] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = () => {
    const apiUrl = 'http://localhost:8000/scrape';

    setLoading(true); // Start loading indicator
    axios.post(apiUrl, { link })
      .then(response => {
        setData(response.data?.comments);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      })
      .finally(() => {
        setLoading(false); // Stop loading indicator
      });
  };

  return (
    <div className='home-main'>
      {/* <SideBar /> */}
      <div className='image-switcher-container'>
        <h1>Notio</h1>
        <ImageSwitcher />
      </div>
      <div className='content-container'>
        <div className='home-main-content'>
          <div className='TypeWriter'>
            <Type />
          </div>
          <div className='content'>
            <div className='header'>
              {/* <div className='input-section'>
                <input
                  className='youtube-input'
                  type='text'
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  placeholder='Enter YouTube link'
                />
                <button className='submit-button' onClick={handleSubmit}>
                  Analyze
                </button>
              </div> */}
              <div className='get-started-container'>
                <button className='get-started'>Get Started</button>
              </div>
            </div>
            <>
              {/* < BarChart data={[{label:"hi",value:10}]} /> */}
            </>
            <div className='result-section'>
              {loading ? (
                <CircularProgress />
              ) : data ? (
                //   <Box sx={{ display: 'flex' }}>
                // </Box>
                // <>
                //             <div className='table-container'>
                //     <table className='comment-table'>
                //       <thead>
                //         <tr>
                //           <th>S.No.</th>
                //           <th>Author</th>
                //           <th>Text</th>
                //           <th>Votes</th>
                //           <th>Sentiment</th>
                //         </tr>
                //       </thead>
                //       <tbody>
                //        {
                //         data.map((comment:any,index:any)=>(
                //           <tr key={index}>
                //               <>
                //               <td>{index+1}</td>
                //               <td><img src={comment.photo} width={35} alt=""  />
                //               {comment.author.replace(/@/g, "")}</td>
                //               <td>{comment.text}</td>
                //               <td>{comment.votes}</td>
                //               <td>{comment.tim}</td>
                //               <td>{comment.sentiment}</td>
                //               </>
                //           </tr>
                //         ))
                //        }
                //       </tbody>
                //     </table>
                //   </div>
                // </>
                <>
                  <div className='table'>
                    <TableContainer component={Paper} >
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>S.No.</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>Votes</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Sentiment</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comment: any, index: any) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell style={{ justifyContent: "space-evenly" }}>
                                <img src={comment.photo} width={35} alt='' />
                                {comment.author.replace(/@/g, '')}
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>{comment.text}</TableCell>
                              <TableCell>{comment.votes}</TableCell>
                              <TableCell>{comment.time}</TableCell>
                              <TableCell>{comment.sentiment}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component='div'
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
