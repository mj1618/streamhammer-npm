let userApiKey = '';

export interface IStoreEventResponse {
  eventId: string;
}

export interface IEvent {
  account_id: string;
  event_id: string;
  collection_id: string;
  stream_id: string;
  stream_sequence: number;
  collection_sequence: number;
  data: any;
  created_at: string;
}

export const streamhammer = () => {
  return {
    setApiKey: (apiKey: string): void => {
      userApiKey = apiKey;
    },
    storeEvent: async (collectionId: string, streamId: string, data: any) => {
      const shResponse = await fetch('https://streamhammer.io/api/stream', {
        method: 'post',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userApiKey}`,
        },
      });
      const json = await shResponse.json();
      return json as IStoreEventResponse;
    },
    readFromCollection: async (
      collectionId: string,
      fromCollectionSequenceNumber = 0
    ) => {
      const shResponse = await fetch(
        `https://streamhammer.io/api/collection/${collectionId}?fromCollectionSequenceNumber=${fromCollectionSequenceNumber}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userApiKey}`,
          },
        }
      );
      return (await shResponse.json()) as IEvent[];
    },
    readFromStream: async (streamId: string, fromStreamSequenceNumber = 0) => {
      const shResponse = await fetch(
        `https://streamhammer.io/api/collection/${streamId}?fromStreamSequenceNumber=${fromStreamSequenceNumber}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userApiKey}`,
          },
        }
      );
      return (await shResponse.json()) as IEvent[];
    },
  };
};
