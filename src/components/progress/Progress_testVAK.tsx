import React from "react";

interface LearningStyle {
  type: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ProgressTestVAKProps {
  learningStyles: LearningStyle[];
  getPercentage: (value: number) => number;
}

export const Progress_testVAK: React.FC<ProgressTestVAKProps> = ({
  learningStyles,
  getPercentage,
}) => {
  return (
    <div className="space-y-6 mb-8">
      {learningStyles.map(({ type, value, icon: Icon }) => (
        <div key={type} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon className="w-5 h-5 mr-2 text-primaryper" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {type}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {getPercentage(value)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div
              className="h-1.5 rounded-full bg-primaryper"
              style={{ width: `${getPercentage(value)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
