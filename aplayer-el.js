class APlayerElement extends HTMLElement{connectedCallback(){window.APlayer&&window.fetch&&this._init()}disconnectedCallback(){!this.lock&&this.aplayer&&(this.aplayer.list.clear(),this.aplayer.destroy())}_camelize(e){return e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(e,t)=>t.toUpperCase())}_init(){let e={};for(let t=0;t<this.attributes.length;t+=1)e[this._camelize(this.attributes[t].name)]=this.attributes[t].value;if(e.container){let t=document.getElementById(e.container);e.container=t}else{let t=document.createElement("div");e.container=t,this.appendChild(t)}this._loadAudios(e),this._convertType(e),this.aplayer=new APlayer(e)}_convertType(e){for(let t in e)"true"!==e[t]&&"false"!==e[t]||(e[t]="true"===e[t]);e.lrcType&&(e.lrcType=parseInt(e.lrcType))}_loadAudios(e){if(!e.audio)return;let t="";e.folder&&(t=e.folder,delete e.folder);let l=["artist","name","cover","lrc","theme"],r=e.audio.split(";"),a=[];r.forEach(e=>{e=e.split(",");let r={};for(let t=0;t<e.length;t++)r[l[t]]=e[t].trim();r.name=r.name||"",r.artist=r.artist||"",r.url=t+r.artist+" - "+r.name+".mp3","-"===r.cover&&(r.cover=t+"cover/"+r.artist+" - "+r.name+".jpg"),"-"===r.lrc&&(r.lrc=t+"lyric/"+r.artist+" - "+r.name+".lrc"),a.push(r)}),e.audio=a}}window.customElements&&!window.customElements.get("aplayer-js")&&(window.APlayerElement=APlayerElement,window.customElements.define("aplayer-js",APlayerElement));