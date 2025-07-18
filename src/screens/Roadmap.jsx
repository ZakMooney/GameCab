import React, { Fragment } from "react";

import {
  Check,
  ClockFading,
  Flag,
  Heart,
  LayoutDashboard,
  CloudCog,
  Crown,
  Paintbrush,
  ChevronRight,
  Database,
  AlignHorizontalSpaceAround,
  Frown,
} from "lucide-react";

import RoadmapItem from "../components/Roadmap/RoadmapItem";

import Typography from "../components/ui/Typography";
import Card from "../components/ui/Card";

const goalItems = [
  {
    title: "V1 Launch",
    subtitle: `Get the "MVP" sorted & see if it's fun`,
    status: "DONE",
    iconOverride: "",
    items: [
      {
        status: "DONE",
        title: "Functional UI",
        description: "Responsive UI that works & isn't horrible to look at",
        progress: "",
        iconOverride: <LayoutDashboard className="w-4 h-4 z-[1]" />,
      },
      {
        status: "DONE",
        title: "IGDB API",
        description: "Put together game data API queries",
        progress: "",
        iconOverride: <CloudCog className="w-4 h-4 z-[1]" />,
      },
      {
        status: "DONE",
        title: "Create Collection",
        description: "Implement save & share from localstorage",
        progress: "",
        iconOverride: <Crown className="w-4 h-4 z-[1]" />,
      },
    ],
  },
  {
    title: "Give It Some Mojo",
    subtitle: "Make it not feel like it was made in a week",
    status: "WIP",
    iconOverride: "",
    items: [
      {
        status: "WIP",
        title: "Create Visual Interest",
        description: "Give the site some style and character",
        progress: "80",
        iconOverride: <Paintbrush className="w-4 h-4 z-[1]" />,
      },
      {
        status: "TODO",
        title: "Expand Features",
        description: "Add some simple QoL features",
        progress: "",
        iconOverride: <ChevronRight className="w-4 h-4 z-[1]" />,
      },
    ],
  },
  {
    title: "Hobby-Thing > Real-Thing",
    subtitle: `Expand "MVP" placeholders into actual features`,
    status: "TODO",
    iconOverride: "",
    items: [
      {
        status: "TODO",
        title: "Create Database",
        description: "Replace localstorage system with an actual database",
        progress: "",
        iconOverride: <Database className="w-4 h-4 z-[1]" />,
      },
      {
        status: "TODO",
        title: "Expand Features II: Attack of the New Stuff",
        description: "Take advantage of DB setup to add multiple lists etc",
        progress: "",
        iconOverride: <AlignHorizontalSpaceAround className="w-4 h-4 z-[1]" />,
      },
            {
        status: "TODO",
        title: "Add Terms",
        description: "Add the boring legalese stuff",
        progress: "",
        iconOverride: <Frown className="w-4 h-4 z-[1]" />,
      },
    ],
  },
];

const Roadmap = () => {

  return (
    <>
      <section className="p-4 max-w-[96rem] m-auto">
        <div className="text-center mb-16 py-12 px-6">
          <Typography
            variant="h1"
            align="center"
            className="mb-4"
          >
            Dev Roadmap
          </Typography>
          <Typography
            variant="subtitle"
            align="center"
            className="max-w-2xl m-auto"
          >
            Making random things in my spare time.<br/>Here's whats already been done, what I'm probably doing now, and what else might come later!
          </Typography>
          <div className="mt-8 flex justify-center">
            <Card className="rounded-full flex gap-4">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <Typography
                  variant="small"
                  align="center"
                >
                  Done
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <Typography
                  variant="small"
                  align="center"
                >
                  WIP
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <Typography
                  variant="small"
                  align="center"
                >
                  Ideas
                </Typography>
              </div>
            </Card>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-400 rounded-full" />

          {goalItems.map((item, index) => {
            return (
              <Fragment key={index}>
                <RoadmapItem goal={item} />
              </Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Roadmap;
