import json
from channels.generic.websocket import AsyncWebsocketConsumer

BOSS_GROUP = 'boss_battle'


class BossConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(BOSS_GROUP, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(BOSS_GROUP, self.channel_name)

    async def receive(self, text_data):
        pass

    async def boss_hp_update(self, event):
        await self.send(text_data=json.dumps({'currentHp': event['currentHp']}))
