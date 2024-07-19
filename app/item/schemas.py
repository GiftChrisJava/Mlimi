def individual_item(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "description": item["description"],
    }


def list_items(items) -> list:
    return [individual_item(item) for item in items]
