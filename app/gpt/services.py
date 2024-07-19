import os
from openai import OpenAI
from typing import AsyncGenerator

# set openai api key
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)


async def recommend_crops(input) -> AsyncGenerator[str, None]:

    prompt = f"""You are an advanced AI designed to assist small-scale farmers in choosing the best crops for their
                    land based on specific inputs. Your goal is to generate personalized crop recommendations that are resilient to
                    climate change and optimized for high yield.
                    The inputs you can take are:\nCountry: {input.country}\nState/District: {input.state}\nSoil Conditions:\n{input.soilCondition}\nSoil Type name: {input.soilType}\nBased on the provided information,
                    recommend a list of crops that are well-suited to the specified region and soil conditions.
                    If specific soil conditions are not provided, use the country's climatic patterns and common soil types to recommend crops for optimal or bumper yield.
                    Consider the different soil types present in the region if the soil condition is not specified and suggest crops accordingly,
                    taking into account the climate.\nWhen the field has not been provided, only use the data given to generate the recommendations without asking for additional information."""

    messages = [
        {"role": "user",
         "content": prompt}
    ]

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
    )

    reply = completion.choices[0].message.content
    return reply
