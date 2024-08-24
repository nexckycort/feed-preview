import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChevronDownIcon,
  MenuIcon,
  PlusIcon,
  RefreshCwIcon,
  SquareIcon
} from 'lucide-react';

import GridItem, { InstanceIdContext } from './components/GridItem';
import { useInstagramFeed } from './hooks/useInstagramFeed';

export default function InstagramFeedPreview() {
  const { posts, instanceId, handleFileChange } = useInstagramFeed();

  return (
    <Card className="w-full max-w-md mx-auto bg-black text-white">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="@nexckycort"
              />
              <AvatarFallback>NC</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <span className="font-semibold">nexckycort</span>
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <RefreshCwIcon className="w-6 h-6" />
            <SquareIcon className="w-6 h-6" />
            <MenuIcon className="w-6 h-6" />
          </div>
        </div>

        <InstanceIdContext.Provider value={instanceId}>
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map(({ id, src }) => (
              <GridItem id={id} src={src as string} key={id} />
            ))}
          </div>
        </InstanceIdContext.Provider>

        <div className="flex justify-between items-center p-4 border-t border-gray-800">
          <Button variant="ghost" size="icon" className="text-white">
            <SquareIcon className="w-6 h-6" />
          </Button>

          <div className="relative">
            <input
              type="file"
              id="file-upload"
              className="sr-only"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
            >
              <PlusIcon className="w-6 h-6 text-white" />
            </label>
          </div>

          <Button variant="ghost" size="icon" className="text-white">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M21 9H3" />
              <path d="M8 3v18" />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
