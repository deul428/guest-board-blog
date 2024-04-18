import React from 'react';
import { useApplicationContext } from '../Contexts/Context';
import { Link } from "react-router-dom";
import Header from "./Header";

function LineUp({datas}) {
  const { listParams, cntryParams } = useApplicationContext();
  var item = datas;

  var currentField = listParams;
  switch (currentField) {
    case 'fic': currentField = 'FICTION';
    break;
    case 'art': currentField = 'ART';
    break;
    case 'vdo': currentField = 'VIDEO';
    break;
    case 'rvw': currentField = 'REVIEW';
    break;
  }
  var currentCntry = cntryParams;
  switch (currentCntry) {
    case 'kor': currentCntry = 'KOREAN';
    break;
    case 'abd': currentCntry = 'ABROAD';
    break;
  }

  //lineup으로 들어온 파라미터가 vdo이면 kor/abd 문구 display: none;
  var isShown = 'none';
  if ((listParams == 'vdo' && cntryParams == 'kor') || (listParams == 'vdo' && cntryParams == 'abd')) {
    isShown = 'none';
  } else {
    isShown = 'inline-block';
  }

  function DataSet() {
    var listArr = [];
    var cntry;

    if (listParams == 'fic'){
      cntry = 0;
    } else if (listParams == 'art') {
      cntry = 1;
    } else if (listParams == 'vdo') { //vdo는 하나니까 하드코딩
      cntry = 2;
      listArr = item[2][1];
    } else if (listParams == 'rvw') {
      cntry = 3;
    }
    if (cntryParams == 'kor') {
      listArr = item[cntry][0];
    } else { 
      listArr = item[cntry][1];
    }

    //station으로 파라미터 연결
    //listArr가 10보다 길 경우 데이터 반으로 잘라서 핸들링
    var listArr01;
    var listArr02;    
    var printArr = [];

    if (listArr.length >= 10) {
      listArr01 = listArr.slice(0, listArr.length/2);
      listArr02 = listArr.slice(listArr.length/2, listArr.length);
      printArr.push(
        <div className="LUWrap LUWrapFicKor">
          <div className="h2Area">
            <h2>{ currentField }<span className="cntryArea" style={{ display: isShown }}>&nbsp;&#45;&nbsp;{ currentCntry }</span></h2>
          </div>
          <div className="itemArea itemFicKor">
            <div className="lineups lineups01">
              {listArr01.map((itemParams) => {
                return ( 
                  <div className="lineup">
                    <Link to={`/lineup/${itemParams.id}`} state={{ item: item[cntry], id: itemParams.id }}>
                      <h1>{itemParams.station}</h1>
                    </Link>
                  </div>
                  )
              })}
            </div>
            <div className="lineups lineups02">
              {listArr02.map((itemParams) => {
                return ( 
                  <div className="lineup">
                    <Link to={`/lineup/${itemParams.id}`} state={{ item: item[cntry], id: itemParams.id }}>
                      <h1>{itemParams.station}</h1>
                    </Link>
                  </div>
                  )
              })}
            </div>
          </div>
        </div>
      );
    } else { 
      printArr.push(
        <div className="LUWrap">
          <div className="h2Area">
            <h2>{ currentField }<span className="cntryArea" style={{ display: isShown }}>&nbsp;&#45;&nbsp;{ currentCntry }</span></h2>
          </div>
          <div className="itemArea">
            <div className="lineups">
              {listArr.map((itemParams) => {
                return ( 
                  <div className="lineup lineupLong">
                    <Link to={`/lineup/${itemParams.id}`} state={{ item: item[cntry], id: itemParams.id }}>
                      <h1>{itemParams.station}</h1>
                    </Link>
                  </div>
                  )
              })}
            </div>
          </div>
        </div>
      );
    }
    return printArr;
  }

  return (
    <div className="LUArea commonBg">
      <Header />
      { DataSet() }
    </div>
  );
}

export default LineUp;