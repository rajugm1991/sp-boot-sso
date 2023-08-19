import React, { useEffect, useState } from "react";
import CourseLessonCardionView from "./CourseLessonCardionView";

function CourseSectionCardion({ course }) {
  const [showCardion, setShowCardion] = useState(0);

  return (
    <>
      {Object.keys(course).length > 0 &&
        course.courseSectionEntities.map((x, index) => (
          <div
            id={x.id}
            class="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800"
          >
            <h2 class="mb-0 hover:cursor-pointer" id="flush-headingOne">
              {showCardion === index ? (
                <button
                  class="bg-gray-100 group  flex w-full items-center rounded-none border-0 px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init
                  data-te-collapse-collapsed
                  data-te-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                  onClick={() => setShowCardion(-1)}
                >
                  <div className="flex flex-col">
                    <span className="font-black">
                      {" "}
                      {index} - {x.name}
                    </span>
                    <span className="px-6 text-xs pt-1">
                      {" "}
                      {x.courseLessonsList.length} Lessons
                    </span>
                  </div>
                  <span class="-mr-1 ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              ) : (
                <button
                  class="group  flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init
                  data-te-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                  onClick={() => setShowCardion(index)}
                >
                  <div className="flex flex-col">
                    <span>
                      {" "}
                      {index} - {x.name}
                    </span>
                    <span className="px-6 text-xs pt-1 font-extralight text-gray-950">
                      {" "}
                      {x.courseLessonsList.length} Lessons
                    </span>
                  </div>

                  <span class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg]  transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              )}
            </h2>
            <CourseLessonCardionView
              courseLessonsList={x.courseLessonsList}
              index={index}
              showCardion={showCardion}
            />
          </div>
        ))}
    </>
  );
}

export default CourseSectionCardion;
