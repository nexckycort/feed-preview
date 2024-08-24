import { randomUUID } from '@/lib/randomUUID';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useState } from 'react';

type Post = {
  id: string;
  src: string | ArrayBuffer;
};

export function useInstagramFeed() {
  const initialPosts = [...Array(15)].map((_, i) => ({
    id: randomUUID(),
    src: `https://picsum.photos/id/${i}/200`
  }));
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [instanceId] = useState(Symbol('instance-id'));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          posts.pop();
          setPosts([
            {
              id: randomUUID(),
              src: reader.result
            },
            ...posts
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data.instanceId === instanceId;
      },
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const destinationId = destination.data.id;
        const destinationSrc = destination.data.src;

        const startId = source.data.id;
        const startSrc = source.data.src;

        if (!destinationSrc || !startSrc) return;

        const updated = [...posts];

        updated[posts.findIndex((post) => post.src === startSrc)] = {
          id: destinationId,
          src: destinationSrc
        } as Post;
        updated[posts.findIndex((post) => post.src === destinationSrc)] = {
          id: startId,
          src: startSrc
        } as Post;

        setPosts(updated);
      }
    });
  }, [instanceId, posts]);

  return { posts, instanceId, handleFileChange };
}
