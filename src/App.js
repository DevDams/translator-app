import { React, Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import axios from "axios";
// component
import Navbar from "./components/navbar";
// css
import "./App.css";
// images & icons
import Micro from "./assets/icons/microphone-2.svg";
import Volume from "./assets/icons/volume-high.svg";
import Clipboard from "./assets/icons/clipboard.svg";
import Change from "./assets/icons/exchange.svg";
import { languages } from "./assets/languages";

const App = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [translateFrom, setTranslateFrom] = useState(languages[0]);
  const [translateTo, setTranslateTo] = useState(languages[1]);

  const [query, setQuery] = useState("");
  const [textToTranslate, setTextToTransate] = useState("");

  const [translateResult, setTranslateResult] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setTextToTransate(query);
    }, 1000);

    const translator = async () => {
      const dataTranslate = {
        q: textToTranslate,
        source: translateFrom.code,
        target: translateTo.code,
        format: "text",
      };

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      await axios
        .post("https://libretranslate.de/translate", dataTranslate, config)
        .then((res) => {
          setTranslateResult(res.data);
          return res.data;
        })
        .catch((error) => {
          return error;
        });
    };

    translator();

    return () => clearTimeout(timeOutId);
  }, [query, textToTranslate, translateFrom.code, translateTo.code]);

  return (
    <div className="App bg-light h-[100vh]">
      <Navbar />
      {/* Translation */}
      <div className="translation w-11/12 md:w-10/12 lg:w-9/12 mx-auto relative flex flex-col lg:flex lg:flex-row mt-32 pb-32">
        <div className="translate-box-left relative w-full lg:w-1/2 h-96 rounded-xl p-5 shadow-md shadow-ligth bg-white">
          <Listbox value={translateFrom} onChange={setTranslateFrom}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="flex items-center">
                      <img
                        src={translateFrom.avatar}
                        alt=""
                        className="flex-shrink-0 h-6 w-6 rounded-md"
                      />
                      <span className="ml-3 block truncate">
                        {translateFrom.name}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {languages.map((langue) => (
                        <Listbox.Option
                          key={langue.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={langue}
                        >
                          {({ translateFrom, active }) => (
                            <>
                              <div className="flex items-center">
                                <img
                                  src={langue.avatar}
                                  alt=""
                                  className="flex-shrink-0 h-6 w-6 rounded-md"
                                />
                                <span
                                  className={classNames(
                                    translateFrom
                                      ? "font-semibold"
                                      : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {langue.name}
                                </span>
                              </div>

                              {translateFrom ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <textarea
            placeholder="Entrez le texte ici..."
            className="w-full py-4 border-none outline-none h-64"
            onChange={(event) => setQuery(event.target.value)}
          ></textarea>

          <button className="absolute bottom-5 left-5 flex items-center justify-center bg-blue w-12 h-12 shadow-md shadow-blue/50 rounded-full">
            <img src={Micro} alt="microphone-icon" className="w-7" />
          </button>
          <div className="action-btn flex items-center absolute bottom-5 right-5">
            <button className="flex items-center justify-center w-9 h-9 mx-1 rounded-md">
              <img src={Volume} alt="volume-icon" className="w-7" />
            </button>
            <button className="flex items-center justify-center w-9 h-9 mx-1 rounded-md">
              <img src={Clipboard} alt="clipboard-icon" className="w-7" />
            </button>
          </div>
        </div>

        <button className="bg-orange flex items-center justify-center mx-2 w-12 h-12 rounded-xl shadow-md shadow-orange/50">
          <img src={Change} alt="exchange-icon" className="w-5" />
        </button>

        <div className="translate-box-right relative w-full lg:w-1/2 h-96 p-5 rounded-xl shadow-md shadow-ligth bg-white">
          <Listbox value={translateTo} onChange={setTranslateTo}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="flex items-center">
                      <img
                        src={translateTo.avatar}
                        alt=""
                        className="flex-shrink-0 h-6 w-6 rounded-md"
                      />
                      <span className="ml-3 block truncate">
                        {translateTo.name}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {languages.map((langue) => (
                        <Listbox.Option
                          key={langue.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={langue}
                        >
                          {({ translateTo, active }) => (
                            <>
                              <div className="flex items-center">
                                <img
                                  src={langue.avatar}
                                  alt=""
                                  className="flex-shrink-0 h-6 w-6 rounded-md"
                                />
                                <span
                                  className={classNames(
                                    translateTo
                                      ? "font-semibold"
                                      : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {langue.name}
                                </span>
                              </div>

                              {translateTo ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <div className="w-full py-4 h-64">
            {translateResult.translatedText}
          </div>
          <div className="action-btn flex items-center absolute bottom-5 right-5">
            <button className="flex items-center justify-center w-9 h-9 mx-1 rounded-md">
              <img src={Volume} alt="volume-icon" className="w-7" />
            </button>
            <button className="flex items-center justify-center w-9 h-9 mx-1 rounded-md">
              <img src={Clipboard} alt="clipboard-icon" className="w-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
