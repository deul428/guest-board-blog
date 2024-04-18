import { Link } from "react-router-dom";
import { useState } from "react";
import { useApplicationContext } from '../Contexts/Context';
// import headerImg from "../../public/assets/img/imgHeader/headerImg.png"
// import headerImgMbil from "../../public/assets/img/imgHeader/headerImgMbil.png"

function Header() {
  const { setListParams } = useApplicationContext();
  const [isSelect, setSelect] = useState("");

  let dataTest = ['fiction', 'art', 'video', 'review'];
  var linkPattern = '/list';

  //클릭하면 depthList로 파라미터 넘겨 줌 -> 지금 클릭된 파라미터가 뭔지 확인, ListParams로 넘겨 줘서 전역에서 사용
  // const depthList = (params, e) => { 
  function depthList(params, e){
    //데이터 핸들링
    var leaveParams;
    switch (params) {
      case 0: 
        leaveParams = 'fic';
        break;
      case 1:
        leaveParams = 'art';
        break;
      case 2:
        leaveParams = 'vdo';
        break;
      case 3:
        leaveParams = 'rvw';
        break;
    } 
    setListParams(leaveParams);
    e.preventDefault();

    setSelect((prev) => {
      let siblings = e.target.parentElement.parentElement.getElementsByClassName('text');
      //타겟의 형제들 순회하면서 selected 클래스 remove
      for (var i=0; i<siblings.length; i++){
        siblings[i].classList.remove('selected');
      }
      //타겟에 selected 클래스 추가
      e.target.classList.add('selected');
      return e.target;
    });

    if (leaveParams == 'vdo') {
      linkPattern = '/lineup';
    } 
	};

  return (
    <header>
      <img src={process.env.PUBLIC_URL + '/assets/img/imgHeader/headerImg.png'} 
      className='imgDefault'
      alt='intro image'
      />
      <img src={process.env.PUBLIC_URL + '/assets/img/imgHeader/headerImg.png'} 
      className='imgMbil'
      style={{display: "none"}}
      alt='intro image'
      />
      <div className='textArea'>
        {dataTest.map((item, idx) => {
          return ( 
            <Link to={linkPattern}>
              <h1
              value={idx}
              className={"text "}
              onClick={(e)=>{depthList(idx, e)}}
              >
                {item}
              </h1>
            </Link>
          )
        })}
      </div>
    </header>
  );
}

export default Header;
