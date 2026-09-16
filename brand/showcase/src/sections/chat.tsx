import { Cell, Section } from "../App";
import {
  Message, MessageAvatar, MessageContent, MessageGroup,
} from "@/registry/new-york-v4/ui/message";
import {
  MessageScroller, MessageScrollerContent, MessageScrollerItem,
  MessageScrollerProvider, MessageScrollerViewport,
} from "@/registry/new-york-v4/ui/message-scroller";
import { Bubble, BubbleContent, BubbleGroup } from "@/registry/new-york-v4/ui/bubble";
import { Avatar, AvatarFallback } from "@/registry/new-york-v4/ui/avatar";

const THREAD = [
  { from: "Q", text: "The nightly seal finished. Both devices verified." },
  { from: "you", text: "Pin it to the vps as well." },
  { from: "Q", text: "Done. Three pins now hold did:holo:blake3:9f2a." },
];

export function Chat() {
  return (
    <Section id="chat" title="Chat">
      <Cell title="Messages" wide>
        <MessageScrollerProvider>
          <MessageScroller className="h-56 rounded-lg border">
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-4">
                <MessageGroup>
                  {THREAD.map((m, i) => (
                    <MessageScrollerItem key={i}>
                      <Message align={m.from === "you" ? "end" : "start"}>
                        {m.from !== "you" && (
                          <MessageAvatar>
                            <Avatar className="size-7">
                              <AvatarFallback>Q</AvatarFallback>
                            </Avatar>
                          </MessageAvatar>
                        )}
                        <MessageContent>{m.text}</MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageGroup>
              </MessageScrollerContent>
            </MessageScrollerViewport>
          </MessageScroller>
        </MessageScrollerProvider>
      </Cell>
      <Cell title="Bubbles">
        <BubbleGroup>
          <Bubble>
            <BubbleContent>Voice call at 16:00 works.</BubbleContent>
          </Bubble>
          <Bubble>
            <BubbleContent>Bringing the new deck.</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </Cell>
    </Section>
  );
}
