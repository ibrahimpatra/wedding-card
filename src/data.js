/* data.js */

export const CONTENT = {
  common: {
    bismillah: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  },
  en: {
    // Minimal Inviter Line
    invite_line: "Sarah & Saifuddin Patrawala request the honor of your presence at the wedding of their son",
    
    groom_name: "Ibrahim",
    bride_name: "Zenab",
    connector: "&", // "&" looks cleaner than "With" in English design
    
    // Cleaned up parent line
    bride_parents_line: "Daughter of Rehana & Hozefa Khanji",
    
    // Breaking the spiritual text for better readability
    spiritual_body: "With the benevolence of Allah, the Wasila of Panjatan Paak (AS), and the Doa Mubarak of Syedna Mufaddal Saifuddin (TUS), this auspicious union is destined to take place.",
    
    // Shortened location footer
    nikah_loc: "Nikah solemnized by Syedna Mufaddal Saifuddin (TUS) at Saifee Mahal, Mumbai",
    
    events_title: "Celebration",
    events: [
      { title: "Majlis", loc: "Fakhri Manzil", date: "Aug 18", time: "Evening" },
      { title: "Nikah Darees", loc: "Fakhri Manzil", date: "Aug 19", time: "Afternoon" },
      // Add more here if needed, the layout handles up to 4 perfectly
    ],
    
    compliments_title: "With Compliments",
    family_list: [
      "Patrawala Family",
      "Khanji Family",
      "M. Saifuddin Family",
      "Relatives & Friends"
    ],
    download_btn: "Save Invite"
  },
  ld: {
    // Arab/Urdu content matches the image style
    invite_line: "سارة بن انے سيف الدين بھائی پتراوالا نِ طرف سي شادي پر اذن پيش كرے چھے",
    groom_name: "ابراهيم",
    bride_name: "زينب",
    connector: "مع",
    bride_parents_line: "بنت ريحانة بن و حذيفة بھائی خانجي",

    // Minimal footer
    nikah_loc: "نكاح نوشرف سيفي محل ممبئي ما سيدنا عالي قدر مفضل سيف الدين (طع) نا دست مبارك پر تيو",
    
    // Clean paragraph
    spiritual_body: "الله سبحانه نا فضل وكرم، پنجتن پاك (ع) ني وسيلة، انے سيدنا عالي قدر مفضل سيف الدين (طع) ني دعاء مبارك ني بركة سي آ شادي نصيب تھئي چھي.",
    
    events_title: "پروگرام",
    events: [
      { title: "مجلس", loc: "فخري منزل", date: "١٨ اوغست", time: "ايونينگ" },
      { title: "نكاح داريس", loc: "فخري منزل", date: "١٩ اوغست", time: "افٹرنون" },
    ],
    
    compliments_title: "مع تحيات",
    family_list: [
      "پتراوالا فميلي",
      "خانجي فميلي",
      "الاهل والأصدقاء"
    ],
    download_btn: "حفظ الدعوة"
  }
};