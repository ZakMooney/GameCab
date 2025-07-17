import React from "react";

import { Check, ClockFading, Flag, PenLine } from "lucide-react";

import Typography from "../ui/Typography";
import Card from "../ui/Card";

const RoadmapItem = ({ goal }) => {
  let iconConBG = "";
  let useIcon = "";

  switch (goal.status) {
    case "DONE":
      iconConBG = "bg-green-500";
      useIcon = <Check className="w-6 h-6 z-[1]" />;
      break;
    case "WIP":
      iconConBG = "bg-blue-500";
      useIcon = <PenLine className="w-6 h-6 z-[1]" />;
      break;
    case "TODO":
      iconConBG = "bg-gray-500";
      useIcon = <Flag className="w-6 h-6 z-[1]" />;
      break;
    default:
      iconConBG = "bg-gray-500";
      useIcon = <Flag className="w-6 h-6 z-[1]" />;
      break;
  }

  if (goal.iconOverride) {
    useIcon = goal.iconOverride;
  }

  const iconConStyles = `
    w-12 h-12 rounded-full flex items-center justify-center
    text-white font-bold text-xl
    shadow-lg
    ${iconConBG}
  `.trim();

  const goalItems = goal.items || [];

  return (
    <div className="mb-12 relative">
      <div className="flex items-start mb-4">
        <div className={`relative ${iconConStyles}`}>
          {useIcon}
          {goal.status === 'WIP' ? (
            <span className={`${iconConStyles} absolute opacity-80 animate-pulse`}></span>
          ) : null}
        </div>
        <div className="ml-6">
          <Typography
            variant="h3"
            className="mb-2"
          >
            {goal.title || ""}
          </Typography>
          <Typography
            variant="body"
          >
            {goal.subtitle || ""}
          </Typography>
        </div>
      </div>
      <div className="ml-12 sm:ml-18 grid md:grid-cols-2 gap-4">
        {goalItems.map((item, index) => {
          let itemIconStyles = "";
          let useIcon = "";

          if (item.iconOverride) {
            useIcon = item.iconOverride;
          }

          switch (item.status) {
            case "DONE":
              itemIconStyles = "w-6 h-6 rounded-full flex items-center justify-center text-white bg-green-500";
              break;
            case "WIP":
              itemIconStyles = "w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-500";
              break;
            case "TODO":
              itemIconStyles = "w-6 h-6 rounded-full flex items-center justify-center text-white bg-gray-500";
              break;
            default:
              itemIconStyles = "w-6 h-6 rounded-full flex items-center justify-center text-white bg-gray-500";
              break;
          }

          let progress;

          if (
            item.progress !== null ||
            item.progress !== undefined ||
            item.progress !== ""
          ) {
            progress = Number(item.progress);
          }

          return (
            <Card
              key={index}
              className="flex shadow-sm hover:shadow-md hover:-translate-y-1 relative"
            >
              <div className="flex flex-1 items-start space-x-3">
                <div className={`${itemIconStyles} relative`}>
                  {useIcon}
                  {item.status === 'WIP' ? (
                    <span className={`${itemIconStyles} absolute opacity-80 animate-ping`}></span>
                  ) : null}
                </div>
                <div className="flex-1">
                  <Typography
                    variant="h5"
                    className="mb-2"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="small"
                    className="mb-3"
                  >
                    {item.description}
                  </Typography>
                  {progress ? (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary dark:bg-primary-dark h-2 w-full rounded-full"
                          style={{
                            maxWidth: progress + '%'
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {progress}% Complete
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapItem;
