"use client"
import useMouse from "@react-hook/mouse-position";
import { MotionValue, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ButtonHTMLAttributes, forwardRef, useEffect, useRef, useState } from "react";
import "@/app/home.css"
import { cn } from "@/lib/utils";
export default function Home() {
  const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
    const buttonref = useRef<HTMLDivElement>(null);
    const { x, y, elementWidth, elementHeight } = useMouse(buttonref, {});
    const valueX = useMotionValue(0);
    const moveFactor = 0.4;
    const transformX = useTransform(valueX, [-1, 1], [-elementWidth! * moveFactor, elementWidth! * moveFactor]);
    const springX = useSpring(transformX, {stiffness: 300, damping: 50});
    const valueY = useMotionValue(0);
    const transformY = useTransform(valueY, [-1, 1], [-elementHeight! * moveFactor, elementHeight! * moveFactor]);
    const springY = useSpring(transformY, {stiffness: 300, damping: 50});
    const [hover, setHover] = useState(false);
    useEffect(() => {
      if (!hover){
        valueX.set(0)
        valueY.set(0)
        return
      }
      valueX.set(((x! / elementWidth!) *2) -1  || 0 )
    }, [x, hover]);
    useEffect(() => {
      valueY.set(((y! / elementHeight!) *2) -1 || 0 )
    }, [y, hover]);
return (
  <motion.div 
    ref={buttonref} 
    initial={{borderRadius: "0.8rem", scale: 1}}
    className={cn("relative w-fit h-fit bg-blue-400 p-2", props.className)} 
    whileHover={{borderRadius: "1.3rem", scale:1.2, zIndex: 40}} 
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 50
    }} 
    style={{x:springX, y: springY}}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    <button ref={ref} {...props} className=" hover:z-50 bg-transparent w-full h-full select-none">
      {props.children}
    </button>
    <div className="absolute w-full h-full pointer-events-none"> 
    </div>
  </motion.div>
)
  })
  return (
    <main className="grid min-h-screen place-content-center w-screen bg-black  p-24">
      {/* <div className=" h-96 w-64 border-4 rounded-3xl p-4"> */}
        {/* <Image className=" rounded-xl" alt="test" src="https://cdn.myshoptet.com/usr/www.planetayurveda.cz/user/shop/big/74-2_planetayurveda-arjuna.jpg?65ec8c9e"  width={500} height={500} /> */}
      <Button className=" bg-orange-500" onClick={()=> console.log("fuck")}>
        hello
      </Button>
    {/* </div> */}
    </main>
  );
}