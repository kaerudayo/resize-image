# resize-image

### result
```
old file data: Promise {
  {
    bitmap: { data: [Uint8ClampedArray], width: 1566, height: 944 },
    size: 2665874
  }
}
./assets/new/back.jpg
new file data: Promise {
  {
    bitmap: { data: [Uint8ClampedArray], width: 1566, height: 944 },
    size: 421848
  }
}
old file data: Promise {
  {
    bitmap: { data: [Uint8ClampedArray], width: 3648, height: 2736 },
    size: 476422
  }
}
./assets/new/tonkatsu.jpg
new file data: Promise {
  {
    bitmap: { data: [Uint8ClampedArray], width: 200, height: 150 },
    size: 22922
  }
}
```

# image

#### compression only
before(2.7MG)
![](./assets/old/back.png)
✨ after(422KB)
![](./assets/new/back.jpg)

#### compression with resize(width 200)
before(476KB)
![](./assets/old/tonkatsu.jpg)
✨ after(23KB)
<br>
![](./assets/new/tonkatsu.jpg)
