
```
./esclu -i b4 -t bundle get _search | jq '.hits.hits'
```

```
[
  {
    "_index": "b4",
    "_type": "bundle",
    "_id": "zbnKW2cB1uX03maR5vEG",
    "_score": 1,
    "_source": {
      "name": "light reading",
      "books": []
    }
  },
  {
    "_index": "b4",
    "_type": "bundle",
    "_id": "nHEYp2cB83jNDjs-8Y9m",
    "_score": 1,
    "_source": {
      "name": "science fiction",
      "books": []
    }
  },
  {
    "_index": "b4",
    "_type": "bundle",
    "_id": "CKPgeWcB2Cwi_q-mx5lC",
    "_score": 1,
    "_source": {
      "name": "nutrition",
      "books": []
    }
  },
  {
    "_index": "b4",
    "_type": "bundle",
    "_id": "P75BTWgBZl6NTqvZQTZt",
    "_score": 1,
    "_source": {
      "name": "prueba",
      "userKey": "twitter-116415832",
      "books": [
        {
          "id": "pg6873",
          "title": "Mark Twain"
        },
        {
          "id": "pg9014",
          "title": "The Letters of Mark Twain"
        },
        {
          "id": "pg1286",
          "title": "Tales from Shakespeare"
        }
      ]
    }
  },
  {
    "_index": "b4",
    "_type": "bundle",
    "_id": "Pr49TWgBZl6NTqvZfzZv",
    "_score": 1,
    "_source": {
      "name": "nuevo-bundle-prueba",
      "userKey": "twitter-116415832",
      "books": [
        {
          "id": "pg14420",
          "title": "The Exemplary Novels of Cervantes"
        },
        {
          "id": "pg21839",
          "title": "Sense and Sensibility"
        }
      ]
    }
  }
]
```
