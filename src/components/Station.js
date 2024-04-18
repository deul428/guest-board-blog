import { useLocation } from "react-router-dom";
import { useApplicationContext } from '../Contexts/Context';

const Posting = () => {
  const { listParams, cntryParams } = useApplicationContext();
  const location = useLocation();

  ////객체의 id 값에 접근 > urlId와 비교 > 같으면 그 객체 값만 추출 > item.value들에 접근

  //url id 가지고 와서 핸들링
  var urlId = location.pathname;
  urlId = urlId.replace('/lineup/', '');

  //params 값이 한국이면 item은 0번째 data
  var item;
  if (cntryParams == 'kor') {
    item = location.state.item[0];
  } else { 
    item = location.state.item[1];
  }
  //props로 넘어온 데이터 id와 urlId 비교해서 일치하는 데이터 추출
  var correspondData;
  for (var i=0; i<item.length; i++){
    if (urlId == item[i]['id']) {
      correspondData = item[i];
    }
  }
  //===================== textField ===================
  const Item = ({ text }) => {
    return <h5 className="textArea">
      <div className="textItems" dangerouslySetInnerHTML={ {__html: text.replace(new RegExp('&nbsp;', 'g'), '&emsp;').replace(new RegExp('\n', 'g'), '<br/>') } }> 
      </div>
    </h5>;
  }
  //객체에 text 값이 있으면 textField 데이터 채워 넣어 div에 넘겨 줌
  var field;
  if ('text' in correspondData == true) { //fic
    field = <Item text={ correspondData.text }></Item>;
  } else if ('art' in correspondData == true) { //art 
    let code = "<img src='/guestBoard/assets/img/art/" + correspondData.art + "' class='imgCntn' alt='content art' onclick='window.open(this.src)'/>"
    return field = ( 
      <div className="stationArea commonBg">
        <div className="detailArea detailArt">
          <h3>{ correspondData.title }</h3>
          <h4>{ correspondData.name }</h4>
          <div className="imgArea" dangerouslySetInnerHTML={ {__html: code } }></div>
        </div>
      </div>
    );
  } else if ('vdo' in correspondData == true) { //vdo
    let code = "<iframe width='100%' height='auto' src='" + correspondData.vdo + "' frameborder='0' controls: 0; allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
    return field = ( 
      <div className="stationArea commonBg">
        <div className="detailArea detailVdo">
          <h3>{ correspondData.title }</h3>
          <h4>{ correspondData.name }</h4>
          <div>
            <div className="vdoArea" dangerouslySetInnerHTML={ {__html: code } }></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stationArea commonBg">
      <div className="detailArea detailFic">
        <h3>{ correspondData.title }</h3>
        <h4>{ correspondData.name }</h4>
        { field }
      </div>
    </div>
  );
}
export default Posting;