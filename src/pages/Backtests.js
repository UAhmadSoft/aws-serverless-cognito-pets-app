import React, { useEffect, useRef } from 'react';
// material
import { Card, Stack, Container, Typography, styled } from '@mui/material';
// components
import Page from '../components/Page';
//

import { useDispatch, useSelector } from 'react-redux';
import {
  createChart,
  ColorType,
  CrosshairMode,
  isUTCTimestamp,
} from 'lightweight-charts';
import backtestData from '../backtests.json';
// ----
// -----------------------------------------------------------------
const PREFIX = 'DocumentPage';
const classes = {
  hover: `${PREFIX}-hover`,
};

const data = Array.from(backtestData);
// you could use this function to convert all your times to required time zone
function timeToTz(date, timeZone) {
  return Math.floor(new Date(date).getTime() / 1000);

  // const zonedDate = new Date(
  //   new Date(originalTime * 1000).toLocaleString('en-US', { timeZone })
  // );
  // return zonedDate.getTime() / 1000;
}

const StyledContainer = styled(Container)({
  [`& .${classes.hover}`]: {
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      color: '#5BE584',
    },
  },
});

function Backtests({ filter }) {
  const { backtests, fetching } = useSelector((st) => st.backtests);

  console.log(
    'is UTC',
    isUTCTimestamp(timeToTz(new Date(data[0].time), 'America/New_York'))
  );

  const backgroundColor = 'white';

  const lineColor = '#2962FF';

  const textColor = 'black';

  const areaTopColor = '#2962FF';

  const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

  const dispatch = useDispatch();

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,

        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      // width: chartContainerRef.current.clientWidth,
      // height: 500,
      height: 300,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });
    // chart.timeScale().fitContent();

    const barSeries = chart.addCandlestickSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    barSeries.setData(
      data.map((el) => ({
        // ...el,
        time: timeToTz(el.time, 'America/New_York'),
        open: +el.open,
        high: +el.high,
        low: +el.low,
        close: +el.close,
      }))
    );

    const lineSeries = chart.addLineSeries({
      lineColor,
      priceFormat: {
        type: 'price',
        precision: 5,
        minMove: 0.0001,
      },
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    lineSeries.setData(
      data.map((el) => ({
        // ...el,
        time: timeToTz(el.time, 'America/New_York'),
        value: el.rl10,
        // dragon_upper: el.dragon_upper,
        // dragon_lower: el.dragon_lower,
        // dragon_middle: el.dragon_middle,
      }))
    );

    const lineSeries2 = chart.addLineSeries({
      lineColor: '#FFA500',
      priceFormat: {
        type: 'price',
        precision: 5,
        minMove: 0.0001,
      },
      color: '#FFA500',
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    lineSeries2.setData(
      data.map((el) => ({
        // ...el,
        time: timeToTz(el.time, 'America/New_York'),
        // value: el.rl10,
        value: el.dragon_upper,
        // dragon_lower: el.dragon_lower,
        // dragon_middle: el.dragon_middle,
      }))
    );

    const lineSeries3 = chart.addLineSeries({
      lineColor: '#FFA500',
      priceFormat: {
        type: 'price',
        precision: 5,
        minMove: 0.0001,
      },
      color: '#FFA500',
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    lineSeries3.setData(
      data.map((el) => ({
        // ...el,
        time: timeToTz(el.time, 'America/New_York'),
        // value: el.rl10,
        // value: el.dragon_upper,
        value: el.dragon_lower,
        // dragon_middle: el.dragon_middle,
      }))
    );

    const lineSeries4 = chart.addLineSeries({
      color: '#808080',
      lineColor: '#808080',
      priceFormat: {
        type: 'price',
        precision: 5,
        minMove: 0.0001,
      },
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    lineSeries4.setData(
      data.map((el) => ({
        // ...el,
        time: timeToTz(el.time, 'America/New_York'),
        // value: el.rl10,
        // value: el.dragon_upper,
        // dragon_lower: el.dragon_lower,
        value: el.dragon_middle,
      }))
    );

    const dotSeries = chart.addLineSeries({
      color: '#808080',
      lineColor: '#808080',
      priceFormat: {
        type: 'price',
        precision: 5,
        minMove: 0.0001,
      },
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineStyle: 1,
    });
    dotSeries.setData(
      data.map((el) => ({
        // ...el,
        time: timeToTz(el.time, 'America/New_York'),
        // value: el.rl10,
        // value: el.dragon_upper,
        // dragon_lower: el.dragon_lower,
        value: el.psar,
      }))
    );

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <>
      <Page title='Backtests '>
        {/* {console.log('filteredDoc', filteredDoc)} */}
        <StyledContainer>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            mb={2}
          >
            <Typography variant='h4' gutterBottom>
              Backtests
            </Typography>
          </Stack>

          <Card>
            <div ref={chartContainerRef}></div>
          </Card>
        </StyledContainer>
      </Page>
    </>
  );
}

export default Backtests;
