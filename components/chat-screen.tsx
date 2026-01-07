"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ReservationCard {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  icon: "train" | "bus" | "hospital" | "grocery" | "restaurant" | "administrative";
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
  reservationCard?: ReservationCard;
}

interface ChatScreenProps {
  initialMessage?: string;
}

export default function ChatScreen({ initialMessage }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요, 박영희님! 오늘은 스마트폰 사용하시면서 어떤 점이 어려우신가요?",
      sender: "assistant",
      timestamp: "오늘 오전 9:41",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const hasSentInitialRef = useRef(false);
  const selectedDestinationRef = useRef<string | null>(null);
  const selectedSymptomRef = useRef<string | null>(null);
  const selectedServiceTypeRef = useRef<string | null>(null);
  const selectedCuisineTypeRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // 어시스턴트 응답 시뮬레이션
    setTimeout(() => {
      let assistantResponse = "";
      let replies: string[] = [];
      let reservationCard: ReservationCard | undefined = undefined;

      // 지역 선택 확인
      const destinations = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "수원", "고양", "용인"];
      const isDestination = destinations.some(dest => messageText.includes(dest)) || messageText === "기타";

      // 교통수단 선택 확인
      const isTransport = messageText === "기차" || messageText === "버스";

        // 병원 예약 관련
        const symptoms = ["머리", "손", "허리", "무릎", "다리", "감기"];
        const isSymptom = symptoms.some(symptom => messageText.includes(symptom));
        const isHospitalRequest = (messageText.includes("병원") || messageText.includes("진료")) && !messageText.includes("맛집") && !messageText.includes("식당");
        
        // 맛집/식당 예약 관련
        const cuisineTypes = ["한식", "양식", "일식", "중식"];
        const isCuisineType = cuisineTypes.includes(messageText);
        const koreanMenu = ["한정식", "김치찌개", "갈비", "제육볶음", "순대국", "비빔밥"];
        const westernMenu = ["스테이크", "파스타", "피자", "햄버거", "샐러드", "리조또"];
        const japaneseMenu = ["초밥", "라멘", "돈까스", "우동", "규동", "오니기리"];
        const chineseMenu = ["짜장면", "짬뽕", "탕수육", "양장피", "마파두부", "깐풍기"];
        const isMenuSelection = [...koreanMenu, ...westernMenu, ...japaneseMenu, ...chineseMenu].includes(messageText);

      if (messageText.includes("기차") && messageText.includes("예매") || 
          messageText.includes("버스") && messageText.includes("예매") ||
          (messageText.includes("기차") || messageText.includes("버스")) && messageText.includes("예매")) {
        // 초기 예매 요청
        assistantResponse = "기차/버스 예매를 도와드리겠습니다. 어디로 가시나요?";
        replies = ["서울", "부산", "대구", "기타"];
        selectedDestinationRef.current = null;
      } else if (isDestination && !selectedDestinationRef.current) {
        // 지역 선택 후
        selectedDestinationRef.current = messageText;
        assistantResponse = "어떤걸로 타시겠어요?";
        replies = ["기차", "버스"];
      } else if (isTransport && selectedDestinationRef.current) {
        // 교통수단 선택 후 - 예약 카드 표시
        const destination = selectedDestinationRef.current;
        const transportType = messageText === "기차" ? "train" : "bus";
        
        assistantResponse = `가까운 ${messageText === "기차" ? "기차역" : "버스터미널"} 예약을 진행합니다.`;
        
          reservationCard = {
            title: messageText === "기차" ? "KTX/무궁화호 예매" : "고속버스/시외버스 예매",
            subtitle: `${destination}행 • ${messageText === "기차" ? "코레일" : "버스터미널"}`,
            description: messageText === "기차" 
              ? "전국 주요 도시를 빠르고 편리하게 연결하는 기차 예매 서비스입니다."
              : "전국 각 지역을 안전하고 편리하게 연결하는 버스 예매 서비스입니다.",
            link: "/activity",
            icon: transportType,
          };
        
        selectedDestinationRef.current = null;
      } else if (isHospitalRequest && !selectedSymptomRef.current) {
        // 병원 예약 초기 요청
        assistantResponse = "병원예약을 도와드리겠습니다. 어디가 아프신가요?";
        replies = ["머리", "손", "허리", "무릎", "다리", "감기"];
        selectedSymptomRef.current = null;
      } else if (isSymptom && !selectedSymptomRef.current) {
        // 증상 선택 후
        selectedSymptomRef.current = messageText;
        let department = "";
        
        if (messageText === "머리") {
          department = "내과";
        } else if (["손", "허리", "무릎", "다리"].includes(messageText)) {
          department = "정형외과";
        } else if (messageText === "감기") {
          department = "이비인후과";
        }
        
        assistantResponse = `가까운 ${department}로 진료 예약을 도와드리겠습니다.`;
        replies = [];
        
        // 예약 완료 메시지와 카드 표시를 위한 추가 처리
        setTimeout(() => {
          const completionMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "예약이 완료되었습니다.",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          };
          
            const hospitalCard: ReservationCard = {
              title: `${department} 진료 예약`,
              subtitle: `가까운 병원 • ${messageText} 관련 진료`,
              description: `예약이 완료되었습니다. 진료 예정일과 시간을 확인해주세요.`,
              link: "/activity",
              icon: "hospital",
            };
          
          const cardMessage: Message = {
            id: (Date.now() + 3).toString(),
            text: "",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            reservationCard: hospitalCard,
          };
          
          setMessages((prev) => [...prev, completionMessage, cardMessage]);
        }, 1500);
        
        selectedSymptomRef.current = null;
      } else if (messageText.includes("장보기") && !selectedServiceTypeRef.current) {
        // 장보기 초기 요청
        assistantResponse = "장보기를 도와드리겠습니다. 어떤 방식으로 진행하시겠어요?";
        replies = ["배달 주문", "직접 구매", "장보기 리스트 작성"];
        selectedServiceTypeRef.current = null;
        } else if ((messageText.includes("맛집") || messageText.includes("식당")) && !selectedCuisineTypeRef.current) {
          // 맛집/식당 예약 초기 요청
          assistantResponse = "맛집/식당을 예약해드릴게요. 어떤게 드시고 싶으세요?";
          replies = ["한식", "양식", "일식", "중식"];
          selectedCuisineTypeRef.current = null;
        } else if (isCuisineType && !selectedCuisineTypeRef.current) {
          // 음식 종류 선택 후 - 세부 메뉴 선택지 제공
          selectedCuisineTypeRef.current = messageText;
          let menuOptions: string[] = [];
          
          if (messageText === "한식") {
            menuOptions = koreanMenu;
          } else if (messageText === "양식") {
            menuOptions = westernMenu;
          } else if (messageText === "일식") {
            menuOptions = japaneseMenu;
          } else if (messageText === "중식") {
            menuOptions = chineseMenu;
          }
          
          assistantResponse = `${messageText} 중 어떤걸 드시고 싶으세요?`;
          replies = menuOptions;
        } else if (isMenuSelection && selectedCuisineTypeRef.current) {
          // 메뉴 선택 후 - 예약 완료
          const cuisineType = selectedCuisineTypeRef.current;
          const restaurantNames: { [key: string]: string } = {
            "한정식": "호남식당",
            "김치찌개": "호남식당",
            "갈비": "갈비마을",
            "제육볶음": "한솥도시락",
            "순대국": "순대국집",
            "비빔밥": "전주비빔밥",
            "스테이크": "스테이크하우스",
            "파스타": "이탈리안레스토랑",
            "피자": "피자나라",
            "햄버거": "버거킹",
            "샐러드": "샐러드바",
            "리조또": "이탈리안레스토랑",
            "초밥": "스시야",
            "라멘": "라멘집",
            "돈까스": "돈까스전문점",
            "우동": "우동집",
            "규동": "규동집",
            "오니기리": "일본식당",
            "짜장면": "중화요리",
            "짬뽕": "중화요리",
            "탕수육": "중화요리",
            "양장피": "중화요리",
            "마파두부": "중화요리",
            "깐풍기": "중화요리",
          };
          
          const restaurantName = restaurantNames[messageText] || "맛있는식당";
          
          assistantResponse = `주변 ${messageText} 맛집을 예약했어요. 가게이름: ${restaurantName}`;
          replies = [];
          
          setTimeout(() => {
            const completionMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "예약이 완료되었습니다.",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
            
            const restaurantCard: ReservationCard = {
              title: `${messageText} 맛집 예약`,
              subtitle: `${restaurantName} • ${cuisineType} 전문점`,
              description: "예약이 완료되었습니다. 예약 날짜와 시간을 확인해주세요.",
              link: "/activity",
              icon: "restaurant",
            };
            
            const cardMessage: Message = {
              id: (Date.now() + 3).toString(),
              text: "",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              reservationCard: restaurantCard,
            };
            
            setMessages((prev) => [...prev, completionMessage, cardMessage]);
          }, 1500);
          
          selectedCuisineTypeRef.current = null;
      } else if (messageText.includes("행정 업무") || messageText.includes("행정")) {
        // 행정 업무 지원 초기 요청
        assistantResponse = "행정 업무 지원을 도와드리겠습니다. 어떤 업무가 필요하신가요?";
        replies = ["주민등록등본", "가족관계증명서", "건강보험증", "기타"];
        selectedServiceTypeRef.current = null;
      } else if (["배달 주문", "직접 구매", "장보기 리스트 작성"].includes(messageText) && selectedServiceTypeRef.current === null) {
        // 장보기 방식 선택 후
        selectedServiceTypeRef.current = messageText;
        assistantResponse = `${messageText}로 진행하겠습니다.`;
        replies = [];
        
        setTimeout(() => {
          const completionMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "예약이 완료되었습니다.",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          };
          
          const groceryCard: ReservationCard = {
            title: "장보기 서비스",
            subtitle: `${messageText} • 가까운 마트/편의점`,
            description: "예약이 완료되었습니다. 배송 예정일과 시간을 확인해주세요.",
            link: "/activity",
            icon: "grocery",
          };
          
          const cardMessage: Message = {
            id: (Date.now() + 3).toString(),
            text: "",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            reservationCard: groceryCard,
          };
          
          setMessages((prev) => [...prev, completionMessage, cardMessage]);
        }, 1500);
        
        selectedServiceTypeRef.current = null;
      } else if (["한식", "중식", "일식", "양식", "기타"].includes(messageText) && !messageText.includes("예약")) {
        // 맛집 음식 종류 선택 후
        selectedServiceTypeRef.current = messageText;
        assistantResponse = `${messageText} 맛집 예약을 진행하겠습니다.`;
        replies = [];
        
        setTimeout(() => {
          const completionMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "예약이 완료되었습니다.",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          };
          
          const restaurantCard: ReservationCard = {
            title: `${messageText} 맛집 예약`,
            subtitle: `가까운 식당 • ${messageText} 전문점`,
            description: "예약이 완료되었습니다. 예약 날짜와 시간을 확인해주세요.",
            link: "/activity",
            icon: "restaurant",
          };
          
          const cardMessage: Message = {
            id: (Date.now() + 3).toString(),
            text: "",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            reservationCard: restaurantCard,
          };
          
          setMessages((prev) => [...prev, completionMessage, cardMessage]);
        }, 1500);
        
        selectedServiceTypeRef.current = null;
      } else if (["주민등록등본", "가족관계증명서", "건강보험증", "기타"].includes(messageText)) {
        // 행정 업무 종류 선택 후
        selectedServiceTypeRef.current = messageText;
        assistantResponse = `${messageText} 발급을 도와드리겠습니다.`;
        replies = [];
        
        setTimeout(() => {
          const completionMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "예약이 완료되었습니다.",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          };
          
          const adminCard: ReservationCard = {
            title: `${messageText} 발급`,
            subtitle: `주민센터/정부24 • 행정 서비스`,
            description: "예약이 완료되었습니다. 발급 예정일과 시간을 확인해주세요.",
            link: "/activity",
            icon: "administrative",
          };
          
          const cardMessage: Message = {
            id: (Date.now() + 3).toString(),
            text: "",
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            reservationCard: adminCard,
          };
          
          setMessages((prev) => [...prev, completionMessage, cardMessage]);
        }, 1500);
        
        selectedServiceTypeRef.current = null;
      } else if (messageText.includes("사진") || messageText.includes("손주")) {
        assistantResponse = "제가 찾아드릴게요. 사진첩(갤러리)에 있나요, 아니면 문자로 받으셨나요?";
        replies = ["사진첩", "문자 메시지", "잘 모르겠어"];
      } else {
        assistantResponse = "네, 알겠습니다. 조금만 기다려주세요.";
        replies = ["네", "아니요"];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: assistantResponse,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        reservationCard,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setQuickReplies(replies);
    }, 1000);
  };

  useEffect(() => {
    if (initialMessage && !hasSentInitialRef.current) {
      // 초기 메시지가 있으면 자동으로 전송 (한 번만 실행)
      hasSentInitialRef.current = true;
      const messageText = initialMessage.trim();
      if (!messageText) return;

      // 사용자 메시지 추가
      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, userMessage]);

      // 어시스턴트 응답 시뮬레이션
      setTimeout(() => {
        let assistantResponse = "";
        let replies: string[] = [];
        let reservationCard: ReservationCard | undefined = undefined;

        // 지역 선택 확인
        const destinations = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "수원", "고양", "용인"];
        const isDestination = destinations.some(dest => messageText.includes(dest)) || messageText === "기타";

        // 교통수단 선택 확인
        const isTransport = messageText === "기차" || messageText === "버스";

        // 병원 예약 관련
        const symptoms = ["머리", "손", "허리", "무릎", "다리", "감기"];
        const isSymptom = symptoms.some(symptom => messageText.includes(symptom));
        const isHospitalRequest = (messageText.includes("병원") || messageText.includes("진료")) && !messageText.includes("맛집") && !messageText.includes("식당");
        
        // 맛집/식당 예약 관련
        const cuisineTypes = ["한식", "양식", "일식", "중식"];
        const isCuisineType = cuisineTypes.includes(messageText);
        const koreanMenu = ["한정식", "김치찌개", "갈비", "제육볶음", "순대국", "비빔밥"];
        const westernMenu = ["스테이크", "파스타", "피자", "햄버거", "샐러드", "리조또"];
        const japaneseMenu = ["초밥", "라멘", "돈까스", "우동", "규동", "오니기리"];
        const chineseMenu = ["짜장면", "짬뽕", "탕수육", "양장피", "마파두부", "깐풍기"];
        const isMenuSelection = [...koreanMenu, ...westernMenu, ...japaneseMenu, ...chineseMenu].includes(messageText);

        if (messageText.includes("기차") && messageText.includes("예매") || 
            messageText.includes("버스") && messageText.includes("예매") ||
            (messageText.includes("기차") || messageText.includes("버스")) && messageText.includes("예매")) {
          // 초기 예매 요청
          assistantResponse = "기차/버스 예매를 도와드리겠습니다. 어디로 가시나요?";
          replies = ["서울", "부산", "대구", "기타"];
          selectedDestinationRef.current = null;
        } else if (isDestination && !selectedDestinationRef.current) {
          // 지역 선택 후
          selectedDestinationRef.current = messageText;
          assistantResponse = "어떤걸로 타시겠어요?";
          replies = ["기차", "버스"];
        } else if (isTransport && selectedDestinationRef.current) {
          // 교통수단 선택 후 - 예약 카드 표시
          const destination = selectedDestinationRef.current;
          const transportType = messageText === "기차" ? "train" : "bus";
          
          assistantResponse = `가까운 ${messageText === "기차" ? "기차역" : "버스터미널"} 예약을 진행합니다.`;
          
          reservationCard = {
            title: messageText === "기차" ? "KTX/무궁화호 예매" : "고속버스/시외버스 예매",
            subtitle: `${destination}행 • ${messageText === "기차" ? "코레일" : "버스터미널"}`,
            description: messageText === "기차" 
              ? "전국 주요 도시를 빠르고 편리하게 연결하는 기차 예매 서비스입니다."
              : "전국 각 지역을 안전하고 편리하게 연결하는 버스 예매 서비스입니다.",
            link: "/activity",
            icon: transportType,
          };
          
          selectedDestinationRef.current = null;
        } else if (isHospitalRequest && !selectedSymptomRef.current) {
          // 병원 예약 초기 요청
          assistantResponse = "병원예약을 도와드리겠습니다. 어디가 아프신가요?";
          replies = ["머리", "손", "허리", "무릎", "다리", "감기"];
          selectedSymptomRef.current = null;
        } else if (isSymptom && !selectedSymptomRef.current) {
          // 증상 선택 후
          selectedSymptomRef.current = messageText;
          let department = "";
          
          if (messageText === "머리") {
            department = "내과";
          } else if (["손", "허리", "무릎", "다리"].includes(messageText)) {
            department = "정형외과";
          } else if (messageText === "감기") {
            department = "이비인후과";
          }
          
          assistantResponse = `가까운 ${department}로 진료 예약을 도와드리겠습니다.`;
          replies = [];
          
          // 예약 완료 메시지와 카드 표시를 위한 추가 처리
          setTimeout(() => {
            const completionMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "예약이 완료되었습니다.",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
            
            const hospitalCard: ReservationCard = {
              title: `${department} 진료 예약`,
              subtitle: `가까운 병원 • ${messageText} 관련 진료`,
              description: `예약이 완료되었습니다. 진료 예정일과 시간을 확인해주세요.`,
              link: "/activity",
              icon: "hospital",
            };
            
            const cardMessage: Message = {
              id: (Date.now() + 3).toString(),
              text: "",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              reservationCard: hospitalCard,
            };
            
            setMessages((prev) => [...prev, completionMessage, cardMessage]);
          }, 1500);
          
          selectedSymptomRef.current = null;
        } else if (messageText.includes("장보기") && !selectedServiceTypeRef.current) {
          // 장보기 초기 요청
          assistantResponse = "장보기를 도와드리겠습니다. 어떤 방식으로 진행하시겠어요?";
          replies = ["배달 주문", "직접 구매", "장보기 리스트 작성"];
          selectedServiceTypeRef.current = null;
        } else if ((messageText.includes("맛집") || messageText.includes("식당")) && !selectedCuisineTypeRef.current) {
          // 맛집/식당 예약 초기 요청
          assistantResponse = "맛집/식당을 예약해드릴게요. 어떤게 드시고 싶으세요?";
          replies = ["한식", "양식", "일식", "중식"];
          selectedCuisineTypeRef.current = null;
        } else if (isCuisineType && !selectedCuisineTypeRef.current) {
          // 음식 종류 선택 후 - 세부 메뉴 선택지 제공
          selectedCuisineTypeRef.current = messageText;
          let menuOptions: string[] = [];
          
          if (messageText === "한식") {
            menuOptions = koreanMenu;
          } else if (messageText === "양식") {
            menuOptions = westernMenu;
          } else if (messageText === "일식") {
            menuOptions = japaneseMenu;
          } else if (messageText === "중식") {
            menuOptions = chineseMenu;
          }
          
          assistantResponse = `${messageText} 중 어떤걸 드시고 싶으세요?`;
          replies = menuOptions;
        } else if (isMenuSelection && selectedCuisineTypeRef.current) {
          // 메뉴 선택 후 - 예약 완료
          const cuisineType = selectedCuisineTypeRef.current;
          const restaurantNames: { [key: string]: string } = {
            "한정식": "호남식당",
            "김치찌개": "호남식당",
            "갈비": "갈비마을",
            "제육볶음": "한솥도시락",
            "순대국": "순대국집",
            "비빔밥": "전주비빔밥",
            "스테이크": "스테이크하우스",
            "파스타": "이탈리안레스토랑",
            "피자": "피자나라",
            "햄버거": "버거킹",
            "샐러드": "샐러드바",
            "리조또": "이탈리안레스토랑",
            "초밥": "스시야",
            "라멘": "라멘집",
            "돈까스": "돈까스전문점",
            "우동": "우동집",
            "규동": "규동집",
            "오니기리": "일본식당",
            "짜장면": "중화요리",
            "짬뽕": "중화요리",
            "탕수육": "중화요리",
            "양장피": "중화요리",
            "마파두부": "중화요리",
            "깐풍기": "중화요리",
          };
          
          const restaurantName = restaurantNames[messageText] || "맛있는식당";
          
          assistantResponse = `주변 ${messageText} 맛집을 예약했어요. 가게이름: ${restaurantName}`;
          replies = [];
          
          setTimeout(() => {
            const completionMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "예약이 완료되었습니다.",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
            
            const restaurantCard: ReservationCard = {
              title: `${messageText} 맛집 예약`,
              subtitle: `${restaurantName} • ${cuisineType} 전문점`,
              description: "예약이 완료되었습니다. 예약 날짜와 시간을 확인해주세요.",
              link: "/activity",
              icon: "restaurant",
            };
            
            const cardMessage: Message = {
              id: (Date.now() + 3).toString(),
              text: "",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              reservationCard: restaurantCard,
            };
            
            setMessages((prev) => [...prev, completionMessage, cardMessage]);
          }, 1500);
          
          selectedCuisineTypeRef.current = null;
        } else if (messageText.includes("행정 업무") || messageText.includes("행정")) {
          // 행정 업무 지원 초기 요청
          assistantResponse = "행정 업무 지원을 도와드리겠습니다. 어떤 업무가 필요하신가요?";
          replies = ["주민등록등본", "가족관계증명서", "건강보험증", "기타"];
          selectedServiceTypeRef.current = null;
        } else if (["배달 주문", "직접 구매", "장보기 리스트 작성"].includes(messageText) && selectedServiceTypeRef.current === null) {
          // 장보기 방식 선택 후
          selectedServiceTypeRef.current = messageText;
          assistantResponse = `${messageText}로 진행하겠습니다.`;
          replies = [];
          
          setTimeout(() => {
            const completionMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "예약이 완료되었습니다.",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
            
            const groceryCard: ReservationCard = {
              title: "장보기 서비스",
              subtitle: `${messageText} • 가까운 마트/편의점`,
              description: "예약이 완료되었습니다. 배송 예정일과 시간을 확인해주세요.",
              link: "/activity",
              icon: "grocery",
            };
            
            const cardMessage: Message = {
              id: (Date.now() + 3).toString(),
              text: "",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              reservationCard: groceryCard,
            };
            
            setMessages((prev) => [...prev, completionMessage, cardMessage]);
          }, 1500);
          
          selectedServiceTypeRef.current = null;
        } else if (["한식", "중식", "일식", "양식", "기타"].includes(messageText) && !messageText.includes("예약")) {
          // 맛집 음식 종류 선택 후
          selectedServiceTypeRef.current = messageText;
          assistantResponse = `${messageText} 맛집 예약을 진행하겠습니다.`;
          replies = [];
          
          setTimeout(() => {
            const completionMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "예약이 완료되었습니다.",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
            
            const restaurantCard: ReservationCard = {
              title: `${messageText} 맛집 예약`,
              subtitle: `가까운 식당 • ${messageText} 전문점`,
              description: "예약이 완료되었습니다. 예약 날짜와 시간을 확인해주세요.",
              link: "/activity",
              icon: "restaurant",
            };
            
            const cardMessage: Message = {
              id: (Date.now() + 3).toString(),
              text: "",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              reservationCard: restaurantCard,
            };
            
            setMessages((prev) => [...prev, completionMessage, cardMessage]);
          }, 1500);
          
          selectedServiceTypeRef.current = null;
        } else if (["주민등록등본", "가족관계증명서", "건강보험증", "기타"].includes(messageText)) {
          // 행정 업무 종류 선택 후
          selectedServiceTypeRef.current = messageText;
          assistantResponse = `${messageText} 발급을 도와드리겠습니다.`;
          replies = [];
          
          setTimeout(() => {
            const completionMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "예약이 완료되었습니다.",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            };
            
            const adminCard: ReservationCard = {
              title: `${messageText} 발급`,
              subtitle: `주민센터/정부24 • 행정 서비스`,
              description: "예약이 완료되었습니다. 발급 예정일과 시간을 확인해주세요.",
              link: "/activity",
              icon: "administrative",
            };
            
            const cardMessage: Message = {
              id: (Date.now() + 3).toString(),
              text: "",
              sender: "assistant",
              timestamp: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              reservationCard: adminCard,
            };
            
            setMessages((prev) => [...prev, completionMessage, cardMessage]);
          }, 1500);
          
          selectedServiceTypeRef.current = null;
        } else if (messageText.includes("사진") || messageText.includes("손주")) {
          assistantResponse = "제가 찾아드릴게요. 사진첩(갤러리)에 있나요, 아니면 문자로 받으셨나요?";
          replies = ["사진첩", "문자 메시지", "잘 모르겠어"];
        } else {
          assistantResponse = "네, 알겠습니다. 조금만 기다려주세요.";
          replies = ["네", "아니요"];
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: assistantResponse,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          reservationCard,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setQuickReplies(replies);
      }, 1000);
    }
  }, [initialMessage]);

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
    setQuickReplies([]);
  };

  const handleVoiceInput = () => {
    // 음성 입력 기능 (추후 구현)
    alert("음성 입력 기능은 준비 중입니다.");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-[428px] mx-auto">
      {/* Header */}
      <header className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7ace15' }}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: '#7ace15' }}></div>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">디지털 도우미</h1>
            <p className="text-xs text-gray-500">온라인 • 대화 가능</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
          >
            {message.text && (
              <div className={`max-w-[75%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "text-gray-900 font-medium"
                      : "bg-white text-gray-900 shadow-sm"
                  }`}
                  style={message.sender === "user" ? { backgroundColor: '#7ace15' } : {}}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                  {message.timestamp}
                </p>
              </div>
            )}
            
            {/* Reservation Card */}
            {message.reservationCard && (
              <div className="w-full max-w-[85%] mt-3">
                {/* Separator */}
                <div className="h-px bg-gray-200 mb-3"></div>
                
                {/* Card */}
                <div className={`rounded-xl p-4 ${message.reservationCard.icon === "train" || message.reservationCard.icon === "bus" ? "bg-blue-50" : ""}`}
                  style={message.reservationCard.icon !== "train" && message.reservationCard.icon !== "bus" ? { backgroundColor: '#f0fdf4' } : {}}
                >
                  <Link
                    href="/activity"
                    className="flex items-start gap-3 group active:scale-[0.98] transition-transform"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${message.reservationCard.icon === "train" || message.reservationCard.icon === "bus" ? "bg-blue-200" : ""}`}
                      style={message.reservationCard.icon !== "train" && message.reservationCard.icon !== "bus" ? { backgroundColor: '#e8f5e0' } : {}}
                    >
                      {message.reservationCard.icon === "train" ? (
                        <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                        </svg>
                      ) : message.reservationCard.icon === "bus" ? (
                        <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 16c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-1h6v1c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-1h2c.55 0 1-.45 1-1s-.45-1-1-1h-2V8h2c.55 0 1-.45 1-1s-.45-1-1-1h-2V5c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v1H9V5c0-1.1-.9-2-2-2H6C4.9 3 4 3.9 4 5v1H2c-.55 0-1 .45-1 1s.45 1 1 1h2v1H2c-.55 0-1 .45-1 1s.45 1 1 1h2v6z"/>
                        </svg>
                      ) : message.reservationCard.icon === "grocery" ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7ace15' }}>
                          <path d="M7 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM1 2v2h2l3.6 7.59-1.35 2.45c-.15.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      ) : message.reservationCard.icon === "restaurant" ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7ace15' }}>
                          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                        </svg>
                      ) : message.reservationCard.icon === "administrative" ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7ace15' }}>
                          <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7ace15' }}>
                          <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zm-4-5H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h10v14z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base mb-1">
                        {message.reservationCard.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {message.reservationCard.subtitle}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {message.reservationCard.description}
                      </p>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Buttons */}
      {quickReplies.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition-all border-2"
                style={{ backgroundColor: '#7ace15', color: '#000000', borderColor: '#5a9e0f' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#65a012';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7ace15';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="여기에 입력하세요..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#7ace15' } as React.CSSProperties}
          />
          {inputText.trim() && (
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-full transition-colors"
              style={{ color: '#7ace15' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="전송"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          )}
          <button
            onClick={handleVoiceInput}
            className="w-12 h-12 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
            style={{ backgroundColor: '#7ace15' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#65a012'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7ace15'}
            aria-label="음성 입력"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

