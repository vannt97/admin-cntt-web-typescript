import style from "./Loading.module.css";
import loadingGif from "../../assets/gif/loading-gif.gif";
export function LoadingLayOut() {
  return (
    <>
      <div className={style.inner}></div>
      <div className={style.outner}>
        <div className={style.loader}></div>
      </div>
    </>
  );
}

export function LoadingGif(props: any) {
  return <img src={loadingGif} className={style.loadingGif} {...props} />;
}
