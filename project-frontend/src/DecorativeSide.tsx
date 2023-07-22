import puffyCloud from "./assets/images/puffy-cloud.png";
import womenRise from "./assets/images/women-rise.png";
import pinkRibbon from "./assets/images/ribbon.png";

function DecorativeSide() {
  return (
    <div
      id="dec-side"
      className="w-[50vw] overflow-hidden flex items-center justify-center bg-red-100"
    >
      <div className="flex flex-col items-center">
        <div className="">
          <img src={pinkRibbon} className="w-2"></img>
          <header className="text-2xl text-pink">BC-DIAGNOSTICS</header>
          <h2 className="text-1xl">Nobody Fights Alone</h2>
        </div>
        <div className="flex">
          <img src={puffyCloud} className="w-15"></img>
          <img src={womenRise} className="w-15"></img>
        </div>
      </div>
    </div>
  );
}
export default DecorativeSide;
