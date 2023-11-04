import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import Chart from 'react-apexcharts';
// import { setDatasets } from 'react-chartjs-2/dist/utils';

function ViewChart({membersPaticipate}: {membersPaticipate: any}) {
  const categories0 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const refContainer = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [text, setText] = useState("");
  const [categories, setCategories] = useState(categories0);
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
    
    setTimeout(()=>{
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




  // sData = [{name:..., data:...}]


  return (
    <div className="mt-10 viewchart">
      {/* <h3>View in livestream</h3> */}
      {/* <div ref={refContainer} /> */}

      <Chart type='line'
          // width={1450}
          // height={550}
          series={sData}
          options={{
            title:{ text:"Product sell in 2021"},
            xaxis:{
                title:{text:"Product Sell in Months"},
                categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            yaxis:{
                title:{text:"Product in K"}                 
            }          

        }}
          >
          </Chart>
    </div>
  );
}

export default ViewChart;