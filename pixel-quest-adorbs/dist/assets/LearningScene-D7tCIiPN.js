var S=Object.defineProperty;var y=(u,l,t)=>l in u?S(u,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[l]=t;var p=(u,l,t)=>y(u,typeof l!="symbol"?l+"":l,t);import{a as x}from"./index-Cs6O3ldV.js";class F extends Phaser.Scene{constructor(){super("DynamicLearningScene");p(this,"backgroundImage");p(this,"mapScale",.7);p(this,"currentTopic","");p(this,"courseData",{});p(this,"loadingText","fetching from ai")}init(t){this.currentTopic=t.topic||"default",this.loadCourseData()}preload(){this.load.image("youtube-thumb","assets/youtube-thumbnail.png"),this.load.image("icon-practice","assets/icon-practice.png"),this.load.image("icon-quiz","assets/icon-quiz.png"),this.load.image("icon-back","assets/icon-back.png"),this.load.image("icon-play","assets/icon-play.png"),this.load.image("icon-xp","assets/icon-xp.png"),this.load.image("thumb-bst","assets/thumbnails/bst-thumbnail.png"),this.load.image("thumb-dynamic","assets/thumbnails/dynamic-thumbnail.png"),this.load.image("thumb-graphs","assets/thumbnails/graphs-thumbnail.png"),this.load.image("thumb-sorting","assets/thumbnails/sorting-thumbnail.png")}create(){this.createSceneSetup(),this.input.on("pointermove",t=>{t.isDown&&(this.cameras.main.scrollY-=t.velocity.y*.5)}),this.input.on("wheel",(t,o,e,i,s)=>{this.cameras.main.scrollY+=i*.5}),this.createBackgroundUI(),this.events.once("courseDataLoaded",()=>{this.createCourseContentUI(),this.createVideoPlayer(),this.createDynamicLearningScene()})}createSceneSetup(){this.cameras.main.setBounds(0,0,800,2e3)}createBackgroundUI(){this.add.rectangle(0,0,800,2e3,0).setOrigin(0);const t=this.add.text(400,200,"Loading course content...",{fontFamily:"Arial",fontSize:"20px",color:"##FFFFFF"}).setOrigin(.5);this.loadingText=t,this.add.image(50,30,"icon-back").setScale(.6).setInteractive().on("pointerdown",()=>{this.scene.start("WorldScene")})}createCourseContentUI(){var o;this.loadingText&&this.loadingText.destroy(),this.add.text(400,50,this.courseData.title||"Learning Topic",{fontFamily:"Arial",fontSize:"28px",color:"#333333",fontStyle:"bold"}).setOrigin(.5,0),this.add.text(400,90,this.courseData.subtitle||"Expand your knowledge",{fontFamily:"Arial",fontSize:"18px",color:"#666666"}).setOrigin(.5,0),this.add.text(400,380,this.courseData.videoTitle||"Educational Video",{fontFamily:"Arial",fontSize:"20px",color:"#333333",fontStyle:"bold"}).setOrigin(.5,0),this.add.text(50,450,"Key Concepts:",{fontFamily:"Arial",fontSize:"22px",color:"#333333",fontStyle:"bold"}),this.courseData.concepts&&Array.isArray(this.courseData.concepts)&&this.courseData.concepts.forEach((e,i)=>{this.add.text(70,490+i*40,e,{fontFamily:"Arial",fontSize:"16px",color:"#444444",wordWrap:{width:700}})});const t=490+(((o=this.courseData.concepts)==null?void 0:o.length)||0)*40+30;this.add.text(50,t,"Did You Know?",{fontFamily:"Arial",fontSize:"22px",color:"#333333",fontStyle:"bold"}),this.add.text(70,t+40,this.courseData.funFact||"Algorithms are everywhere!",{fontFamily:"Arial",fontSize:"16px",color:"#444444",fontStyle:"italic",wordWrap:{width:700}}),this.add.image(70,t+100,"icon-xp").setScale(.5),this.add.text(100,t+100,`${this.courseData.xpReward||30} XP`,{fontFamily:"Arial",fontSize:"20px",color:"#FFA500",fontStyle:"bold"}).setOrigin(0,.5),this.loadingText&&(this.loadingText.destroy(),this.loadingText=null)}async loadCourseData(){try{let t=await x(this.currentTopic);console.log("Raw response:",t),t.includes("```")&&(t=t.replace(/```json\s*/g,""),t=t.replace(/```\s*/g,"")),this.courseData=JSON.parse(t),console.log("Parsed data:",this.courseData),this.events.emit("courseDataLoaded")}catch(t){console.error(`Error loading course data: ${t}`),this.courseData=this.getDefaultCourseData(),this.events.emit("courseDataLoaded")}}createVideoPlayer(){var d,r;const t=document.createElement("iframe"),o=this.scale.width*.7,e=this.scale.height*.45;if(t.width=o.toString(),t.height=e.toString(),t.allow="autoplay; encrypted-media",t.frameBorder="0",t.style.position="absolute",t.allowFullscreen=!0,this.courseData&&this.courseData.videoURL){let c=null;this.courseData.videoURL.includes("watch?v=")?c=(d=this.courseData.videoURL.split("v=")[1])==null?void 0:d.split("&")[0]:this.courseData.videoURL.includes("youtu.be/")&&(c=(r=this.courseData.videoURL.split("youtu.be/")[1])==null?void 0:r.split("?")[0]),c?t.src=`https://www.youtube.com/embed/${c}`:(console.error("Invalid video URL format"),t.src="https://www.youtube.com/embed/cySVml6e_Fc")}else console.error("No video URL found for topic:",this.currentTopic),t.src="https://www.youtube.com/embed/cySVml6e_Fc";const i=this.scale.width/2,s=this.scale.height*.45,a=this.add.dom(i,s,t);return this.scale.on("resize",c=>{a.setPosition(c.width/2,c.height*.45);const n=c.width*.7,h=c.height*.45;t.width=n.toString(),t.height=h.toString()}),a}getDefaultCourseData(){return{title:"Algorithm Basics",subtitle:"Start your algorithm journey",videoTitle:"Introduction to Algorithms and Data Structures",videoURL:"https://www.youtube.com/watch?v=kHi1DUhp9kM",thumbnailKey:"youtube-thumb",duration:"7:20",channel:"CodeCraft",views:"5K",concepts:["📝 Algorithms are step-by-step procedures for solving problems","🧮 Time and space complexity measure efficiency","🔍 Different problems require different algorithmic approaches","🔄 Iteration and recursion are two fundamental approaches"],funFact:'The word "algorithm" comes from the name of Persian mathematician Al-Khwarizmi!',xpReward:30}}createDynamicLearningScene(){this.add.rectangle(this.scale.width/2,this.scale.height/2,this.scale.width,this.scale.height,921118);const t=this.add.rectangle(this.scale.width/2,this.scale.height/2,this.scale.width*.9,this.scale.height*.9,1973806,.95).setStrokeStyle(2,6451876),o=this.add.graphics();o.fillStyle(12424185,1),o.fillRect(t.x-t.width/2,t.y-t.height/2,t.width,4);const e=this.add.text(this.scale.width/2,t.y-t.height/2+50,`LEARN: ${this.courseData.title}`,{fontSize:"28px",color:"#FF79C6",fontStyle:"bold"}).setOrigin(.5),i=this.add.text(this.scale.width/2,e.y+45,this.courseData.subtitle,{fontSize:"20px",color:"#8BE9FD",fontStyle:"italic"}).setOrigin(.5);this.createXPBadge(t),this.createVideoSection(i.y+80,t.width*.8),this.createTwoColumnLayout(t,i.y+380),this.createNavigationButtons(t)}createXPBadge(t){const o=this.add.container(t.x+t.width/2-70,t.y-t.height/2+60),e=this.add.circle(0,0,30,16758892),i=this.add.text(0,0,`+${this.courseData.xpReward}`,{fontSize:"18px",color:"#282A36",fontStyle:"bold"}).setOrigin(.5),s=this.add.text(0,35,"XP",{fontSize:"16px",color:"#FFB86C",fontStyle:"bold"}).setOrigin(.5);o.add([e,i,s])}createVideoSection(t,o){const e=this.add.container(this.scale.width/2,t+100),i=this.add.rectangle(0,0,o,o*.5625,0).setStrokeStyle(2,16733525),s=this.add.image(0,0,this.courseData.thumbnailKey).setDisplaySize(i.width,i.height),a=this.add.circle(0,0,40,16733525).setInteractive(),d=this.add.triangle(a.x+5,a.y,0,-15,20,0,0,15,16777215),r=this.add.text(0,i.height/2+35,this.courseData.videoTitle,{fontSize:"18px",color:"#F8F8F2",fontStyle:"bold"}).setOrigin(.5),c=this.add.text(0,r.y+30,`${this.courseData.duration} • ${this.courseData.views} views • ${this.courseData.channel}`,{fontSize:"16px",color:"#6272A4"}).setOrigin(.5),n=this.add.text(0,c.y+30,"Watch on YouTube →",{fontSize:"16px",color:"#8BE9FD",fontStyle:"bold"}).setOrigin(.5).setInteractive();e.add([i,s,a,d,r,c,n]),a.on("pointerdown",()=>{this.openYouTubeLink()}),n.on("pointerdown",()=>{this.openYouTubeLink()})}createTwoColumnLayout(t,o){const e=t.width*.4;t.x-e/2,t.x+e/2,this.createConceptsColumn(100,800,500)}createConceptsColumn(t,o,e){const i=this.add.container(t,o),s=this.add.text(0,0,"KEY CONCEPTS",{fontSize:"22px",color:"#50FA7B",fontStyle:"bold"});i.add(s);let a=50;this.courseData.concepts.forEach((n,h)=>{const g=this.add.text(0,a,n,{fontSize:"18px",color:"#F8F8F2",wordWrap:{width:e-20},lineSpacing:5});i.add(g),a+=g.height+25});const d=this.add.rectangle(e/2,a+40,e,80,4474714).setStrokeStyle(2,16758892),r=this.add.text(e/2,a+20,"FUN FACT",{fontSize:"16px",color:"#FFB86C",fontStyle:"bold"}).setOrigin(.5),c=this.add.text(e/2,a+50,this.courseData.funFact,{fontSize:"16px",color:"#F8F8F2",wordWrap:{width:e-40},align:"center"}).setOrigin(.5);i.add([d,r,c])}createResourcesColumn(t,o,e){const i=this.add.container(t,o),s=this.add.text(0,0,"ADDITIONAL RESOURCES",{fontSize:"22px",color:"#FF79C6",fontStyle:"bold"});i.add(s)}createResourceCard(t,o,e,i,s,a,d,r,c){const n=this.add.rectangle(o,e,i,80,r).setStrokeStyle(1,9169405).setInteractive(),h=this.add.circle(o-i/2+40,e,25,5307003),g=this.add.text(o-i/2+80,e-15,s,{fontSize:"18px",color:"#F8F8F2",fontStyle:"bold"}).setOrigin(0,.5),f=this.add.text(g.x,e+15,a,{fontSize:"16px",color:"#8BE9FD"}).setOrigin(0,.5),m=this.add.text(o+i/2-30,e,"→",{fontSize:"24px",color:"#F8F8F2"}).setOrigin(.5);t.add([n,h,g,f,m]),n.on("pointerdown",()=>{this.scene.start(c,{topic:this.currentTopic})}),n.on("pointerover",()=>{n.setStrokeStyle(2,5307003),n.setFillStyle(r+1118481)}),n.on("pointerout",()=>{n.setStrokeStyle(1,9169405),n.setFillStyle(r)})}createProgressBar(t,o){const e=this.add.container(t.x,o),i=this.add.text(-t.width*.2,0,"PROGRESS",{fontSize:"18px",color:"#8BE9FD",fontStyle:"bold"}).setOrigin(0,.5),s=this.add.rectangle(t.width*.05,0,t.width*.3,20,2632246).setStrokeStyle(1,6451876),a=this.getProgressForTopic(this.currentTopic),d=this.add.rectangle(s.x-s.width/2+2,s.y,Math.max(s.width*(a/100)-4,0),s.height-4,12424185).setOrigin(0,.5),r=this.add.text(s.x+s.width/2+20,s.y,`${a}%`,{fontSize:"16px",color:"#F8F8F2",fontStyle:"bold"}).setOrigin(0,.5);e.add([i,s,d,r])}getProgressForTopic(t){return{bst:65,dynamic:40,graphs:25,sorting:80,default:10}[t]||0}createNavigationButtons(t){const o=this.add.container(this.scale.width/2,t.y+t.height/2-60),e=20,i=180,s=140,a=this.add.rectangle(-i/2-s/2-e,0,i,50,5307003,1).setInteractive(),d=this.add.text(a.x,a.y,"Practice Now",{fontSize:"18px",color:"#282A36",fontStyle:"bold"}).setOrigin(.5),r=this.add.rectangle(0,0,s,50,9169405,1).setInteractive(),c=this.add.text(r.x,r.y,"Quiz",{fontSize:"18px",color:"#282A36",fontStyle:"bold"}).setOrigin(.5),n=this.add.rectangle(i/2+s/2+e,0,s,50,16733525,1).setInteractive(),h=this.add.text(n.x,n.y,"Back",{fontSize:"18px",color:"#F8F8F2",fontStyle:"bold"}).setOrigin(.5);o.add([a,d,r,c,n,h]),this.addButtonInteractivity(a,d,"PracticeScene"),this.addButtonInteractivity(r,c,"QuizScene"),this.addButtonInteractivity(n,h,"WorldScene")}addButtonInteractivity(t,o,e){const i=t.fillColor,s=i+1118481;t.on("pointerover",()=>{t.setFillStyle(s),o.setScale(1.05)}),t.on("pointerout",()=>{t.setFillStyle(i),o.setScale(1)}),t.on("pointerdown",()=>{this.tweens.add({targets:t,scaleX:.95,scaleY:.95,duration:50,yoyo:!0,ease:"Power1",onComplete:()=>{e==="WorldScene"?this.scene.start(e):this.scene.start(e,{topic:this.currentTopic})}})})}openYouTubeLink(){this.tweens.add({targets:this.children.list.filter(t=>t instanceof Phaser.GameObjects.Rectangle),alpha:.7,duration:100,yoyo:!0,ease:"Power1",onComplete:()=>{console.log(`Opening YouTube URL: ${this.courseData.videoURL}`)}})}}export{F as LearningScene};
