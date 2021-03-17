import React from "react";
import Weather from "../Weather";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = (props) => shallow(<Weather {...props} />);

describe("should render weather component", () => {
  let component;
  beforeEach(() => {
    const countryData = {
      _id: "6048b7cc835218486b15e2c9",
      capitalLocation: {
        coordinates: [41.902782, 12.496365],
        type: "Point",
      },
      imageUrl:
        "https://www.atlanticcouncil.org/wp-content/uploads/2020/09/Rome-coroavirus-large-1024x683.jpg",
      videoUrl: "https://youtu.be/FlRwssZYRM0",
      currency: "EUR",
      ISOCode: "IT",
      flag: "https://restcountries.eu/data/ita.svg",
      timezones: ["UTC+01:00"],
      localizations: {
        en: {
          capital: "Rome",
          description:
            "Italy (Italian: Italia [iˈtaːlja]), officially the Italian Republic (Italian: Repubblica Italiana [reˈpubːlika itaˈljaːna]), is a country consisting of a peninsula delimited by the Alps and several islands surrounding it. Italy is located in Southern Europe, and is also considered part of Western Europe. A unitary parliamentary republic with Rome as its capital, the country covers a total area of 301,340 km2 (116,350 sq mi) and shares land borders with France, Switzerland, Austria, Slovenia, and the enclaved microstates of Vatican City and San Marino. Italy has a territorial enclave in Switzerland (Campione) and a maritime exclave in Tunisian waters (Lampedusa). With around 60 million inhabitants, Italy is the third-most populous member state of the European Union.",
          name: "Italy",
        },
        ru: {
          capital: "Рим",
          description:
            "Ита́лия (итал. Italia [iˈtaːlja]), официальное название — Италья́нская Респу́блика (итал. Repubblica Italiana [reˈpubːlika itaˈljaːna]) — государство в Южной Европе, в центре Средиземноморья. Входит в Евросоюз и НАТО с момента их создания, является третьей по величине экономикой еврозоны. Граничит с Францией на северо-западе (протяжённость границы — 488 км), Швейцарией (740 км) и Австрией (430 км) — на севере, Словенией — на северо-востоке (232 км). Внутри территории Италии находятся два государства-анклава: государство Сан-Марино и расположенное внутри территории Рима ассоциированное с Италией государство Ватикан, с каждым из которых Италия имеет внутреннюю границу протяжённостью соответственно 39 км и 3,2 км. Занимает Апеннинский полуостров, крайний северо-запад Балканского полуострова, Паданскую равнину, южные склоны Альп, острова Сицилия, Сардиния и ряд мелких островов. На территории Италии находится 55 памятников Всемирного наследия ЮНЕСКО — Италия разделяет с Китаем первое место по их количеству.",
          name: "Италия",
        },
        de: {
          capital: "Rom",
          description:
            "Italien, europäisches Land mit langer Mittelmeerküste, hat die westliche Kultur und Küche nachhaltig geprägt. In der Hauptstadt Rom befinden sich neben dem Vatikan auch imposante Kunstwerke und Ruinen antiker Bauwerke. Weitere bedeutende Städte des Landes sind Florenz, in dem Meisterwerke der Renaissance wie Michelangelos „David“ und Brunelleschis Duomo zu finden sind, Venedig, die Stadt der Kanäle, und Mailand, die Modehauptstadt Italiens.",
          name: "Italien",
        },
      },
    };
    component = setUp({ countryData });
  });

  it("should render weather component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should contain div class weather", () => {
    const weather = component.find(".weather");
    expect(weather).toHaveLength(1);
  });

  it("should contain div with class minimized", () => {
    const weather = component.find(".minimized");
    expect(weather.length).toEqual(1);
  });
});
