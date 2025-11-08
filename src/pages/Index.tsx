import { useState, useCallback } from "react";
import { AgentAvatar } from "@/components/AgentAvatar";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { TopicCard } from "@/components/TopicCard";
import { ChatSidebar } from "@/components/ChatSidebar";
import { toast } from "sonner";

interface Topic {
  id: number;
  title: string;
  description: string;
  votes: number;
}

interface Message {
  text: string;
  sender: string;
  timestamp: string;
}

const Index = () => {
  const [volume, setVolume] = useState(0);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [votedTopicId, setVotedTopicId] = useState<number | null>(null);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const handleMessagesUpdate = async (messages: Message[]) => {
    setIsLoadingTopics(true);
    try {
      const response = await fetch(`${API_URL}/api/topics/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch topic suggestions");
      }

      const newTopics = await response.json();
      setTopics(newTopics);
      toast.success("New topic suggestions generated!");
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast.error("Failed to generate topic suggestions");
    } finally {
      setIsLoadingTopics(false);
    }
  };

  const handleVote = (topicId: number) => {
    if (votedTopicId === topicId) {
      // Unvote
      setTopics((prev) =>
        prev.map((t) => (t.id === topicId ? { ...t, votes: t.votes - 1 } : t))
      );
      setVotedTopicId(null);
      toast.info("Vote removed");
    } else {
      // Remove previous vote and add new one
      setTopics((prev) =>
        prev.map((t) => {
          if (t.id === topicId) return { ...t, votes: t.votes + 1 };
          if (t.id === votedTopicId) return { ...t, votes: t.votes - 1 };
          return t;
        })
      );
      setVotedTopicId(topicId);
      toast.success("Vote recorded!");
    }
  };

  const handleRemove = (topicId: number) => {
    setTopics((prev) => prev.filter((t) => t.id !== topicId));
    if (votedTopicId === topicId) {
      setVotedTopicId(null);
    }
    toast.info("Topic removed");
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      <div className="container mx-auto p-6 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            The Endless Podcast
          </h1>
          <p className="text-xl text-muted-foreground">
            Watch two AI agents discuss topics in real-time
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="space-y-8 overflow-y-auto">
            {/* Agents Display */}
            <div className="flex items-center justify-between gap-8 p-8 bg-card rounded-lg border border-border animate-scale-in">
              <AgentAvatar name="Alex" type="alex" volume={volume} />
              <AudioVisualizer onVolumeChange={handleVolumeChange} />
              <AgentAvatar name="Mira" type="mira" volume={volume} />
            </div>

            {/* Topic Voting Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Vote for Topics
              </h2>
              
              {isLoadingTopics ? (
                <div className="text-center py-12 text-muted-foreground">
                  Generating topic suggestions...
                </div>
              ) : topics.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Start a conversation to see AI-generated topic suggestions
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      {...topic}
                      isVoted={votedTopicId === topic.id}
                      onVote={() => handleVote(topic.id)}
                      onRemove={() => handleRemove(topic.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="h-full overflow-hidden">
            <ChatSidebar onMessagesUpdate={handleMessagesUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
