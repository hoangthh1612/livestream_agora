import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import Chart from 'react-apexcharts';
// import { setDatasets } from 'react-chartjs-2/dist/utils';

function ViewChart({membersPaticipate}: {membersPaticipate: any}) {
  const categories0 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const refContainer = useRef(null);
  const [num, setNum] = useState(0);
  const [data, setData] = useState<any>([0, 0, 0]);

  const [data10, setData10] = useState(0);
/////////////


const [sData, setSdata]= useState<any>([]);

const getData = async () => {

  console.log("called ");
  
 
  // return data2.data[0].participants.length;
  setData10(membersPaticipate?.length);

  } 

  console.log(data10);
  
  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
  useEffect(() => {
    
    const timeout = setTimeout(()=>{
      // addData();
      getData();
      setNum(getRndInteger(50, 1000));
      // setNum(num + 0 )
      if(data10 > 0)
      {
        data.push(data10);
      }
      else {
        data.push(data10);
      }

      
      }, 3000);
    //   setDataSource([{
    //     name: 'Biểu đồ lượt xem',
    //     data: data
    //   }
    // ]);
    console.log(sData);
    setSdata([
        {
            name:"bieu do",
            data: data
        }])
    
  }, [num]);
  

  // const options = {
  //   chart: {
  //     id: 'realtime',
  //     height: 350,
  //     type: 'line',
  //     animations: {
  //       enabled: true,
  //       easing: 'linear',
  //       dynamicAnimation: {
  //         speed: 1000
  //       }
  //     },
  //     toolbar: {
  //       show: false
  //     },
  //     zoom: {
  //       enabled: false
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   stroke: {
  //     curve: 'smooth'
  //   },
  //   title: {
  //     text: 'Dynamic Updating Chart',
  //     align: 'left'
  //   },
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: 'datetime',
      
  //   },
  //   yaxis: {
  //     max: 100
  //   },
  //   legend: {
  //     show: false
  //     },
  //   }
  



  // sData = [{name:..., data:...}]


  return (
    <div className="mt-10 viewchart">
      {/* <h3>View in livestream</h3> */}
      {/* <div ref={refContainer} /> */}

      <Chart type='line'
          width={1000}
          height={350}
          series={sData}
          
          options={{
            chart: {
              id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                  enabled: true,
                  easing: 'linear',
                  dynamicAnimation: {
                    speed: 1000
                  }
                },
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                }
            }, 
            title:{ text:"Product sell in 2021"},
            xaxis:{
                title:{text:"Product Sell in Months"},
                categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            yaxis:{
                title:{text:"Product in K"}                 
            },
            stroke: {
              curve: 'smooth'
            }, 
            legend: {
              show: false
            },         

        }}
          

          >
          </Chart>
    </div>
  );
}

export default ViewChart; 