/*<![CDATA[ */
(function (e, t) {
    (function (e, t) {
        function a(e, t, a) {
            return t in config && ("regexChapter" == t ? e.find(e => e.match(config[t])) : "filter" == a ? e.filter(e => config[t].some(t => t == e)) : e.find(e => config[t].some(t => t == e)))
        }

        function i(e, t) {
            return t = t.split(/[^a-zA-Z]/).filter(e => 0 != e.length), e.find(e => {
                let a = e.split(/[^a-zA-Z]/).filter(e => 0 != e.length);
                if ((1 == t.length && 1 == a.length || t.length == a.length) && t[0] == a[0]) return !0
            })
        }

        function l(e) {
            return new Promise(e)
        }

        function s(e) {
            let t = localStorage.getItem(e || "BOOKMARK");
            return t ? JSON.parse(t) : []
        }

        function r(e, t) {
            let a = s(t);
            return a.find(t => t.id == e)
        }

        function n(e, t, a) {
            let i = s(a);
            if ("add" == e) {
                if (i.length == (config.max_bookmark || 2)) return bookmarkHTML("bookmarkLimit"), !1;
                i.unshift(t), localStorage.setItem(a || "BOOKMARK", JSON.stringify(i))
            } else if ("remove" == e) i.forEach((e, a) => {
                e.id == t && i.splice(a, 1)
            }), localStorage.setItem(a || "BOOKMARK", JSON.stringify(i));
            else if ("historyUpdate" == e) {
                let e = r(t.id, a);
                e && n("remove", e.id, a), i = s(a), i.length == (config.max_history || 10) ? i = i.slice(0, -1) : i.unshift(t), localStorage.setItem(a, JSON.stringify(i))
            }
            return !0
        }
        let o = "querySelectorAll",
            d = "querySelector",
            c = e[o]("[data-post-series]"),
            p = e[o]("[data-post-sitemap]"),
            m = e[d](".surprise"),
            h = e[d](".advancedsearch"),
            g = e[d]("#readerarea"),
            f = e[d]("#readerarea-loading"),
            u = e[o]("[name*=select-paged]"),
            v = e[d]("#readingmode"),
            b = e[d]("#lihide"),
            L = e[o](".ts-wpop-nav-tabs li"),
            y = e[o](".serieslist[data-id]"),
            A = e[d]("#main-menu"),
            E = e[d](".shme"),
            S = e[d](".searchx.minmb"),
            k = e[o](".srcmob"),
            x = e[d]("#thememode input"),
            T = e.body || e.getElementsByTagName("body")[0],
            w = e.documentElement || e.getElementsByTagName("html"),
            M = e[o](".bookmark[data-id]"),
            C = e[d]("#bookmark-pool"),
            I = e[d]("#bm-history"),
            H = e[d]('[data-history="true"]'),
            P = e[d](".totop"),
            R = e[d]('[data-value="home"]'),
            B = e[d]('[data-value="link"]'),
            N = e[o](".ch-next-btn"),
            O = e[o](".ch-prev-btn"),
            j = e[d]("#s"),
            Y = e[d](".readingnav.rnavbot"),
            U = e[o]("[data-perfect-post]"),
            z = "sessionStorage" in t,
            D = "localStorage" in t,
            J = !!z && sessionStorage.getItem("postSeries"),
            $ = !!z && sessionStorage.getItem("surprise"),
            K = !!D && localStorage.getItem("reader-mode"),
            Z = new URLSearchParams(e.location.search);
        t.postSeriesArr = J ? JSON.parse(J) : new Array, t.surprise = $ ? JSON.parse($) : new Array, t.imageReader = new Array, E && A && E.addEventListener("click", () => A.classList.toggle("shwx")), 2 == k.length && S && k.forEach(e => e.addEventListener("click", () => S.classList.toggle("minmbx"))), x && (x.addEventListener("change", e => {
            let t = e.currentTarget;
            t.checked ? (localStorage.removeItem("theme-mode"), T.classList.remove("lightmode")) : (localStorage.setItem("theme-mode", "light"), T.classList.add("lightmode"))
        }), "light" == localStorage.getItem("theme-mode") && (x.checked = !1)), [y, L].every(e => 3 == e.length) && L.forEach((e, t, a) => {
            [1, 2].some(e => t == e) && y[0].parentElement.appendChild(y[t]), e.addEventListener("click", () => {
                a.forEach((e, t) => {
                    e.classList.remove("active"), y[t].setAttribute("hidden", "hidden")
                }), e.classList.add("active"), y[t].removeAttribute("hidden")
            })
        }), P && t.addEventListener("scroll", () => {
            (t.scrollY || t.pageYOffset) > 300 ? P.classList.add("tampil") : P.classList.remove("tampil"), P.addEventListener("click", () => T.scrollIntoView({
                behavior: "smooth",
                top: 0
            }))
        }), config.perfectPost && 0 != U.length && U.forEach(e => {
            let t = e.dataset.perfectPost,
                a = config.perfectPost;
            t in a && (e.innerHTML = a[t])
        }), j && config.liveSearch && (() => {
            let i, l = e.createElement("div"),
                s = () => {
                    let e = j.parentElement.parentElement,
                        a = e.parentElement.parentElement,
                        i = e.getBoundingClientRect(),
                        s = a.getBoundingClientRect();
                    t.matchMedia("(max-width: 800px)").matches ? (l.style.top = s.bottom + "px", l.style.left = s.left + "px", l.style.width = s.width + "px") : (l.style.top = i.bottom + 3 + "px", l.style.left = i.left + "px", l.style.width = i.width + "px")
                };
            l.className = "live-search-item", ["resize", "scroll"].forEach(e => t.addEventListener(e, s)), e.addEventListener("click", e => !e.target.closest(0 != l.getBoundingClientRect().width && l.remove())), j.addEventListener("keyup", e => {
                let t = e.currentTarget,
                    r = t.value,
                    n = l.firstChild,
                    o = l.getBoundingClientRect().width;
                r && r.length >= 3 ? ((!n || n && "CENTER" != n.nodeName) && (l.innerHTML = '<center><i class="fa fa-sync fa-spin"></i></center>'), 0 == o && (T.appendChild(l), s()), clearTimeout(i), i = setTimeout(() => {
                    let e = new BloggerScript({
                        jumlah: 20,
                        q: 'label:"Series"+' + r,
                        feed: "summary",
                        noImage: config.noImage,
                        sizeImage: "w40-h60-c-rw"
                    });
                    e.run(e => {
                        if (j.value == r)
                            if (e.length > 0) {
                                let t = "";
                                e.forEach(e => {
                                    let i = a(e.label, "status"),
                                        l = a(e.label, "regexChapter"),
                                        s = a(e.label, "genre", "filter").join(", ");
                                    t += '<li class="live-search-post"><a href="' + e.link + '"><div class="live-search-thumb"><img src="' + e.image + '"/></div><div class="over"><div class="autotitle">' + e.title + "</div><span>", i && (t += i + "<i></i>"), l && (t += l), t += '</span><span class="live-meta">' + s + "</span></div></a></li>"
                                }), l.innerHTML = "<ul>" + t + "</ul>"
                            } else l.innerHTML = "<p>Not Found</p>"
                    })
                }, 2e3)) : 0 != o && l.remove()
            })
        })(), g && (() => {
            let e = (e, t, a) => {
                    let i = "";
                    return Array.isArray(e) ? e.forEach((e, t, a) => {
                        i += `<option value='${t}'>${t+1}/${a.length}</option>`
                    }) : i += `<option value='${t}'>${t+1}/${a.length}</option>`, i
                },
                a = (e, t) => {
                    let a = t + 1,
                        i = t - 1;
                    N.length == O.length && N.forEach((t, l) => {
                        a != e ? t.setAttribute("data-value-index", a) : t.removeAttribute("data-value-index"), -1 != i ? O[l].setAttribute("data-value-index", i) : O[l].removeAttribute("data-value-index")
                    })
                },
                i = (e, a) => new Promise(i => {
                    let l = t.imageReader[e],
                        s = v ? v.selectedIndex : 0;
                    a || (0 == s ? l.classList.add("curdown") : ["curdown", "curleft", "curright"].forEach(e => {
                        l.classList.contains(e) && l.classList.remove(e)
                    })), l.hasAttribute("data-src") ? (l.onload = (() => {
                        l.classList.add("lazyloaded"), l.classList.remove("lazy"), l.removeAttribute("data-src"), i(l)
                    }), l.onerror = (() => {
                        config.noImage && (l.src = config.noImage), l.classList.add("lazyloaded"), l.classList.remove("lazy"), i(l)
                    }), l.src = l.getAttribute("data-src")) : i(l)
                }),
                l = e => {
                    w.scrollTo({
                        top: t.imageReader[e].getBoundingClientRect().top + (t.scrollY || t.pageYOffset),
                        behavior: "smooth"
                    }), t.dispatchEvent(new Event("scroll"))
                };
            if (Y && config.readingBar && t.addEventListener("scroll", e => {
                    let t = g.getBoundingClientRect(),
                        a = t.top,
                        i = t.bottom,
                        l = t.height,
                        s = -a,
                        r = s / (l - w.clientHeight) * 100,
                        n = Math.floor(r),
                        o = Y.lastChild.firstChild.firstChild;
                    100 != n && (n = r), n >= 100 && (n = 100), Y.style.bottom = a < 0 && i > 0 ? "0" : "-" + Y.scrollHeight + "px", o.style.width = n < 0 ? "0%" : n + "%"
                }), f)
                if ("chapterImage" in config) {
                    let s = "";
                    config.chapterImage.forEach((a, i, l) => {
                        s += e(a, i, l);
                        let r = new Image;
                        r.className = "lazy", r.dataset.index = i, r.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAADklEQVR42mNkAANGCAUAACMAA2w/AMgAAAAASUVORK5CYII=", r.setAttribute("data-src", a), r.setAttribute("loading", "lazy"), t.imageReader.push(r)
                    });
                    let r = () => {
                        for (let e = 0; e < t.imageReader.length; e++) i(e), g.appendChild(t.imageReader[e]), t.imageReader.length - 1 == e && (f.style.display = "none")
                    };
                    t.addEventListener("load", () => {
                        setTimeout(() => {
                            g.innerHTML = "", 0 == v.selectedIndex ? r() : i(0).then(e => {
                                g.appendChild(e), f.style.display = "none"
                            })
                        }, 1e3)
                    }), v && (v.selectedIndex = K ? 1 : 0), u.length > 0 && v && (u.forEach(e => {
                        e.innerHTML = s, e.addEventListener("change", t => {
                            let s = t.currentTarget,
                                r = s.selectedIndex,
                                n = e.options.length,
                                o = g.children[0];
                            1 == v.selectedIndex ? (a(n, r), g.innerHTML = "", f.style.display = "", i(r).then(e => {
                                s.selectedIndex == r && (o && 0 != o.classList.length && e.setAttribute("class", o.getAttribute("class")), g.appendChild(e), f.style.display = "none", l(r))
                            })) : l(r)
                        }), v && 1 == v.selectedIndex && a(e.options.length, 0)
                    }), v.addEventListener("change", () => {
                        let e = v.selectedIndex;
                        0 == e ? (D && localStorage.removeItem("reader-mode"), N.length == O.length && N.forEach((e, t) => {
                            [e, O[t]].forEach(e => {
                                e.hasAttribute("data-value-index") && e.removeAttribute("data-value-index")
                            })
                        }), g.innerHTML = "", r()) : (D && localStorage.setItem("reader-mode", "single-page"), a(u[0].options.length, 0), g.innerHTML = "", f.style.display = "", i(0).then(e => {
                            g.appendChild(e), f.style.display = "none"
                        }))
                    }), t.addEventListener("scroll", () => {
                        let e = t.scrollY || t.pageYOffset,
                            a = t.imageReader.find(a => 0 != a.getBoundingClientRect().height && a.getBoundingClientRect().top + (t.scrollY || t.pageYOffset) <= e + 1 && a.getBoundingClientRect().bottom + (t.scrollY || t.pageYOffset) >= e);
                        a && u.forEach(e => {
                            e.selectedIndex != a.dataset.index && (e.selectedIndex = a.dataset.index)
                        })
                    }), g.addEventListener("click", e => {
                        let a = e.target;
                        if ("DIV" != a.nodeName)
                            if (1 == v.selectedIndex) {
                                let t = u[0].selectedIndex;
                                i(t, !0).then(a => {
                                    let i = a.getBoundingClientRect(),
                                        l = i.left + i.width / 2,
                                        s = u[0].options.length - 1,
                                        r = e.clientX,
                                        n = N[0],
                                        o = O[0];
                                    if (r > i.left && r < l)
                                        if (0 != t) u[0].selectedIndex = t - 1;
                                        else if (o && !o.classList.contains("disabled")) return o.click();
                                    if (r < i.right && r > l)
                                        if (t != s) u[0].selectedIndex = t + 1;
                                        else if (n && !n.classList.contains("disabled")) return n.click();
                                    u[0].selectedIndex != t && u[0].dispatchEvent(new Event("change"))
                                })
                            } else w.scrollTo({
                                top: (t.scrollY || t.pageYOffset) + t.innerHeight,
                                behavior: "smooth"
                            })
                    }), g.addEventListener("mousemove", e => {
                        let t = u[0].selectedIndex;
                        i(t).then(t => {
                            let a = t.getBoundingClientRect(),
                                i = a.left + a.width / 2,
                                l = e.clientX;
                            if (1 == v.selectedIndex) {
                                if (0 == a.width) return;
                                t.classList.contains("curdown") && t.classList.remove("curdown"), l > a.left && l < i ? t.classList.contains("curleft") || t.classList.add("curleft") : t.classList.contains("curleft") && t.classList.remove("curleft"), l < a.right && l > i ? t.classList.contains("curright") || t.classList.add("curright") : t.classList.contains("curright") && t.classList.remove("curright")
                            }
                        })
                    }))
                } else setTimeout(() => {
                    f.style.display = "none"
                }, 3e3)
        })(), M.length > 0 && D && M.forEach(e => {
            let t = e.getAttribute("data-id"),
                a = r(t);
            a && bookmarkHTML("btnActive", e), e.addEventListener("click", async () => {
                let a = r(t);
                if (a) n("remove", t), bookmarkHTML("btnInActive", e);
                else {
                    bookmarkHTML("btnLoading", e);
                    let a = new Promise(e => {
                        let a = new BloggerScript({
                            type: {
                                name: "posts",
                                id: t
                            },
                            feed: "summary"
                        });
                        a.run(t => {
                            t = 1 == t.length ? t[0] : {}, e(t)
                        })
                    });
                    a.then(t => {
                        if ("title" in t) {
                            let a = n("add", t);
                            a ? bookmarkHTML("btnActive", e) : bookmarkHTML("btnInActive", e)
                        } else alert("error"), bookmarkHTML("btnInActive", e)
                    })
                }
            })
        }), C && D && (() => {
            let t = C.parentElement,
                a = s();
            if ("bookmark_home" in config && t.classList.contains("bookmark-home") && a.slice(0, config.bookmark_home), a.length >= 1) {
                if (C.innerHTML = createMultiHTML(a, "series"), !t.classList.contains("bookmark-home")) {
                    let a = e.createElement("span");
                    a.className = "hapus", a.id = "hapus", a.innerHTML = "Remove", a.addEventListener("click", () => {
                        if (0 == C.children.length) return !1;
                        a.classList.toggle("added");
                        for (let t = 0; t < C.children.length; t++) {
                            const i = C.children[t],
                                l = i.children[0],
                                r = l.dataset.id;
                            if (a.classList.contains("added")) {
                                let t = e.createElement("div");
                                t.innerHTML = "Remove", t.className = "delmark", t.addEventListener("click", () => {
                                    n("remove", r), i.remove(), 0 == s().length && (bookmarkHTML("bookmarkEmpty", C), a.remove())
                                }), l.insertBefore(t, l.children[0])
                            } else l.children[0].classList.contains("delmark") && l.children[0].remove()
                        }
                    }), t.children[0].appendChild(a)
                }
            } else bookmarkHTML("bookmarkEmpty", C)
        })(), H && n("historyUpdate", {
            id: H.dataset.historyId,
            title: H.dataset.historyTitle,
            link: H.dataset.historyUrl
        }, "HISTORY"), I && (() => {
            let e = s("HISTORY");
            if (0 != e.length) {
                let t = "";
                e.forEach(e => t += `<li data-id='${e.id}'><a href='${e.link}'>${e.title}</a></li>`), I.innerHTML = t
            } else {
                let e = I.parentElement.parentElement.parentElement;
                e.classList.contains("section") && e.remove()
            }
        })(), m && m.addEventListener("click", e => {
            e.preventDefault();
            let t = e.currentTarget,
                a = t.hash;
            "#random" == a ? (pageLoader("add"), new BloggerRandom({
                jumlah: 1,
                label: "Series",
                feed: "summary"
            }).run(e => {
                e[0] ? window.location.href = e[0].link : (alert("Not Found"), pageLoader("remove"))
            })) : window.location.href = t.href
        }), c.length > 0 && (() => {
            function a(e) {
                return new Promise(a => {
                    let s = {};
                    ["data-post-default", "data-post-label", "data-post-jumlah", "data-post-tab", "data-post-random", "data-post-order", "data-post-series"].forEach((t, a) => {
                        let i = e.getAttribute(t);
                        0 == a ? s.feed = i || "summary" : 1 == a ? s.label = i || !1 : 2 == a && i ? s.jumlah = i || 10 : 3 == a ? s.tab = i || 5 : 4 == a && i ? s.random = i : 5 == a && i ? s.orderby = i : 6 == a && i && (s["post-type"] = i)
                    });
                    let r = t.postSeriesArr.find(e => s.random && "random-post" == e.id || e.id == s["post-type"]),
                        n = {
                            id: s.random ? "random-post" : s["post-type"],
                            items: new Array
                        },
                        o = s.random ? new BloggerRandom(s) : new BloggerScript(s);
                    s.random && (o.config = {
                        jumlah: 150,
                        label: "Series"
                    }), r ? a({
                        x: s,
                        items: r
                    }) : (["latest", "project"].some(e => s["post-type"] == e) && (o.config = {
                        orderby: "updated"
                    }), o.run(e => {
                        let r = e.map(e => {
                            let t = {};
                            for (let a in e)["title", "image", "summary", "content", "label", "link"].some(e => e == a) && ("slider-top" == s["post-type"] || "summary" != a && "content" != a) && (t[a] = e[a]);
                            return t
                        });
                        if (["latest", "project"].some(e => s["post-type"] == e))
                            for (let e = 0, o = Promise.resolve(); e < r.length; e++) o = o.then(() => l(a => {
                                let n = r[e],
                                    o = i(n.label, n.title),
                                    d = "project" == s["post-type"] ? "latest" : "project",
                                    c = t.postSeriesArr.find(e => e.id == d),
                                    p = !1;
                                c && (p = c.items.find(e => e.title == n.title)), l(e => {
                                    if ("postChapterList" in t) e(t.postChapterList);
                                    else {
                                        let a = new BloggerScript({
                                            q: 'label:"Manga Chapter"|label:"Novel Chapter"|label:"Chapter"',
                                            jumlah: 150
                                        });
                                        a.run(a => {
                                            t.postChapterList = a, e(a)
                                        })
                                    }
                                }).then(t => {
                                    p ? (r[e] = p, a()) : l(e => {
                                        let a = t.filter(e => e.label.some(e => e == o)).slice(0, 3);
                                        if (a.length < 3 && t.length >= 150) {
                                            let t = new BloggerScript({
                                                label: o,
                                                jumlah: 4
                                            });
                                            t.run(t => {
                                                t = t.filter(e => !e.label.some(e => "Series" == e)), e(t.slice(0, 3))
                                            })
                                        } else e(a)
                                    }).then(t => {
                                        r[e].items = t.map(e => ({
                                            title: e.title,
                                            link: e.link,
                                            date: e.date,
                                            published: e.published
                                        })), a()
                                    })
                                })
                            })).then(() => {
                                n.items.push(r[e]), e == r.length - 1 && a({
                                    x: s,
                                    items: n
                                })
                            });
                        else n.items = r, a({
                            x: s,
                            items: n
                        })
                    }))
                })
            }
            for (let i = 0, s = Promise.resolve(); i < c.length; i++) s = s.then(() => a(c[i], i, c)).then(({
                items: a,
                x: s
            }) => {
                if (t.postSeriesArr.some(e => e.id == a.id) || t.postSeriesArr.push(a), ["latest", "project"].some(e => s["post-type"] == e) ? c[i].innerHTML = createMultiHTML(a.items, "latest") : "new" == s["post-type"] ? c[i].innerHTML = "<ul>" + createMultiHTML(a.items, "list") + "</ul>" : "multi-tab" == s["post-type"] ? (() => {
                        let a = t.postSeriesArr.find(e => e.id == s["post-type"]),
                            r = t.postSeriesArr.find(e => "random-post" == e.id),
                            n = BloggerScript.prototype.shuffle;
                        l(e => {
                            if (!a && r) {
                                let a = {},
                                    i = {
                                        id: s["post-type"],
                                        items: []
                                    };
                                for (key in r.items.forEach(e => {
                                        let t = e.label.filter(e => config.genre.some(t => t == e));
                                        t && t.length > 0 && t.forEach(t => {
                                            t in a ? a[t].push(e) : a[t] = [e]
                                        })
                                    }), a)
                                    if (Object.hasOwnProperty.call(a, key)) {
                                        let e = a[key].map(e => ({
                                            title: e.title,
                                            link: e.link,
                                            image: e.image,
                                            label: e.label
                                        }));
                                        e = n(e).slice(0, s.jumlah), i.items.push({
                                            id: key,
                                            items: e
                                        })
                                    } i.items = n(i.items).slice(0, s.tab), t.postSeriesArr.push(i), e(i)
                            } else a && a.items.length > 0 ? e(a) : e(!1)
                        }).then(t => {
                            if (t) {
                                let a = '<ul class="nav-tabs">',
                                    l = '<div class="listupd">';
                                c[i].className = "series-gen", t.items.forEach((e, t) => {
                                    a += "<li", 0 == t && (a += ' class="active"'), a += '><a href="#series-' + t + '">' + e.id + "</a></li>", l += '<div id="series-' + t + '" class="tab-pane', 0 == t && (l += " active"), l += '">', l += createMultiHTML(e.items, "series"), l += "</div>"
                                }), c[i].innerHTML = a + "</ul>" + l + "</div>", e[o](".series-gen .nav-tabs [href*=series]").forEach((t, a) => {
                                    t.addEventListener("click", a => {
                                        a.preventDefault();
                                        let i = t.hash;
                                        e[o](".series-gen .listupd .tab-pane, .series-gen .nav-tabs li").forEach(e => e.classList.remove("active")), t.parentElement.classList.add("active"), e[d](i).classList.add("active")
                                    })
                                })
                            } else c[i].parentElement.remove()
                        })
                    })() : "slider-top" == s["post-type"] ? (() => {
                        let e = t.postSeriesArr.find(e => e.id == s["post-type"]),
                            a = t.postSeriesArr.find(e => "random-post" == e.id),
                            r = BloggerScript.prototype.shuffle;
                        l(i => {
                            if (a && !e) {
                                let e = {
                                    id: s["post-type"],
                                    items: r(a.items).slice(0, s.jumlah)
                                };
                                t.postSeriesArr.push(e), i(e)
                            } else e && e.items.length > 0 ? i(e) : i(!1)
                        }).then(e => {
                            e ? (c[i].innerHTML = createMultiHTML(e.items, "slider"), createOwl(() => jQuery(".loop").owlCarousel({
                                center: !0,
                                loop: !0,
                                nav: !0,
                                margin: 0,
                                autoplay: !0,
                                autoplayTimeout: 5e3,
                                autoplayHoverPause: !0,
                                responsive: {
                                    0: {
                                        items: 1,
                                        stagePadding: 0
                                    }
                                }
                            }))) : c[i].parentElement.remove()
                        })
                    })() : c[i].innerHTML = createMultiHTML(a.items, "series"), i == c.length - 1) {
                    let e = t.postSeriesArr.map(e => e.id),
                        a = e.indexOf("random-post"),
                        i = J ? JSON.parse(J).length : 0; - 1 != a && t.postSeriesArr.splice(a, 1), z && (!J || i < t.postSeriesArr.length) && sessionStorage.setItem("postSeries", JSON.stringify(t.postSeriesArr))
                }
            })
        })(), p.length > 0 && (() => {
            let a = p[0],
                s = a.parentElement,
                r = {
                    firstContent: !0
                };
            ["data-post-default", "data-post-label", "data-max-post", "data-post-sitemap", "data-post-title"].forEach((e, t) => {
                let i = a.getAttribute(e);
                0 == t ? r.feed = i || "summary" : 1 == t && i ? "chapterLabel" == i ? r["post-label"] = i : r.label = i : 2 == t ? r["max-perpage"] = i || 20 : 3 == t && i ? r["sitemap-type"] = i : 4 == t && i && (r["post-title"] = i)
            }), ["searchLabel", "chapternav", "chapterlist"].some(e => e == r["sitemap-type"]) && (r.orderby = "published"), r["post-label"] && r["post-title"] && config[r["post-label"]] && (r.label = i(config[r["post-label"]], r["post-title"])), Z.get("max-results") && (r["max-perpage"] = Z.get("max-results"));
            let n = new BloggerSitemap(r),
                c = Pagination.prototype.arrayToPage,
                m = e => {
                    for (let t = 0; t < e.children.length; t++) {
                        const a = e.children[t];
                        if (["pagination", "hpage"].some(e => a.classList.contains(e)) || 0 == a.classList.length) {
                            a.remove();
                            break
                        }
                    }
                },
                g = (e, t, a, i) => {
                    if (0 != e.length) {
                        let i = e[t].items;
                        a.innerHTML = createMultiHTML(i, "series")
                    } else {
                        a.dataset.id;
                        let e = i ? `There are no posts with this criteria:${i.join(", ")}` : "No Posts";
                        a.innerHTML = `<h4><center>${e}</center></h4>`
                    }
                    w.scrollTo({
                        top: a.parentElement.getBoundingClientRect().top + window.scrollY,
                        behavior: "smooth"
                    })
                };
            l(e => {
                let i = localStorage.getItem("x-sitemap");
                i ? (localStorage.removeItem("x-sitemap"), e(JSON.parse(i))) : n.run(i => {
                    if (1 == i.totalGet && i.posts && i.posts.length > 0) {
                        if (!["AZ", "searchLabel", "chapternav", "chapterlist"].some(e => e == r["sitemap-type"])) {
                            let e = createMultiHTML(i.posts.slice(0, r["max-perpage"]), "series") || "<h4><center>No Posts</center></h4>";
                            if (a.innerHTML = '<div class="listupd">' + e + "</div>", 0 == i.posts.length) return;
                            s = a, a = a.children[0]
                        }
                        if (!["chapternav", "AZ", "chapterlist"].some(e => e == r["sitemap-type"])) {
                            let e = r["max-perpage"] ? c(i.totalPosts, r["max-perpage"]).length : 0;
                            e > 1 && new Pagination({
                                callback: function (e, i) {
                                    (1 == i || "postSitemapPage" in t) && (m(s), s.appendChild(e), "postSitemapPage" in t && g(t.postSitemapPage, i - 1, a))
                                }
                            }).createPage(e, 1)
                        }
                    }
                    1 == i.completed && e(i)
                })
            }).then(i => {
                t.postSitemapArr = i.posts.map(e => ({
                    id: e.id,
                    title: e.title,
                    link: e.link,
                    label: e.label,
                    date: e.date,
                    published: e.published,
                    updated: e.updated,
                    image: e.image
                })), ["chapternav", "chapterlist"].some(e => e == r["sitemap-type"]) || (t.postSitemapPage = c(t.postSitemapArr, r["max-perpage"])), "sitemapFilter" == r["sitemap-type"] && (() => {
                    let i, l, p, f, u = e.createElement("div"),
                        v = e.createElement("div"),
                        b = e[d](".advancedsearch .filters"),
                        L = n.alphaSort(t.postSitemapArr),
                        y = (t => {
                            if (t.length > 0) {
                                let a = e.createElement("div"),
                                    i = '<div class="nav_apb">',
                                    l = '<div class="soralist">';
                                return t.forEach((e, t) => {
                                    i += '<a href="#' + e.id + '">' + e.id.toUpperCase() + "</a>", 0 == t && (l += '<div class="lxx"></div>'), l += '<div class="blix"><span><a name="' + e.id + '">' + e.id.toUpperCase() + "</a></span><ul>", e.items.length > 0 && e.items.forEach(e => {
                                        l += '<li><a class="series" href="' + e.link + '">' + e.title + "</a></li>"
                                    }), l += "</ul></div>"
                                }), a.innerHTML = i + "</div>" + l + "</div>", a.children[0].childNodes.forEach(t => {
                                    t.addEventListener("click", a => {
                                        a.preventDefault();
                                        let i = t.hash.slice(1);
                                        w.scrollTo({
                                            top: e[d]('[name="' + i + '"]').offsetTop + 100,
                                            behavior: "smooth"
                                        })
                                    })
                                }), a
                            }
                            return ""
                        })(L);
                    u.className = "clear", v.className = "other-opts", v.innerHTML = '<div class="modex"><a href="#text-mode">Text Mode</a></div>', p = v.children[0], f = p.children[0], y && (i = y.children[0], l = y.children[1]), (t => {
                        if (!t) return;
                        [t, v, u].forEach(e => {
                            s.insertBefore(e, a)
                        }), t.removeAttribute("hidden");
                        let i = e[o](".filter.dropdown"),
                            l = ["genre", "status", "type", "order"];
                        l.length == i.length && (i.forEach((t, a) => {
                            let s = l[a],
                                r = e.createElement("ul"),
                                n = e.createElement("div"),
                                c = "";
                            n.className = "clear", r.className = "genre" == s ? "dropdown-menu c4 genrez" : "dropdown-menu c1", s in config && (config[s].forEach((e, t) => {
                                let a = e.replace(/\s/g, "-").toLowerCase();
                                "genre" != s && 0 == t && (c += '<li><input id="' + s + '-all" type="radio" name="' + s + '" value=""/><label for="' + s + '-all">All</label></li>'), c += "<li>", c += "genre" == s ? '<input id="genre-' + a + '" type="checkbox" name="genre[]" value="' + e + '"/><label for="genre-' + a + '">' + e + "</label>" : '<input id="' + s + "-" + a + '" type="radio" name="' + s + '" value="' + e + '"/><label for="' + s + "-" + a + '">' + e + "</label>", c += "</ul>"
                            }), r.innerHTML = c, t.appendChild(r)), 0 == a && t.parentElement.appendChild(n);
                            let p = r.previousElementSibling,
                                m = r[o]("li");
                            p.addEventListener("click", () => {
                                t.classList.contains("open") || i.forEach(e => e.classList.remove("open")), t.classList.toggle("open")
                            }), r.addEventListener("click", e => e.stopPropagation()), m.length > 0 && m.forEach(e => {
                                e.children[0].addEventListener("click", () => {
                                    let e = t[d](".filterCount"),
                                        a = Array.from(m).filter(e => 1 == e.children[0].checked),
                                        i = a.length;
                                    e.innerText = 1 == i ? a[0].children[0].value || "All" : i > 1 ? i : "All"
                                })
                            })
                        }), e.addEventListener("click", e => {
                            e.target.closest(".dropdown-toggle") || i.forEach(e => e.classList.remove("open"))
                        }))
                    })(h), f.addEventListener("click", r => {
                        r.preventDefault();
                        let n = f.hash.slice(1);
                        "text-mode" == n ? (m(s), h.setAttribute("hidden", "hidden"), s.insertBefore(i, u), [p, l].forEach(e => {
                            s.insertBefore(e, a)
                        }), [a, v].forEach(e => e.remove()), f.href = "#image-mode", f.innerText = "Image Mode", w.scrollTo({
                            top: l.parentElement.getBoundingClientRect().top + (t.scrollY || t.pageYOffset),
                            behavior: "smooth"
                        })) : (f.href = "#text-mode", f.innerText = "Text Mode", h.removeAttribute("hidden"), s.insertBefore(v, i), [i, p, l].forEach(e => e.remove()), v.appendChild(p), s.appendChild(a), e[d](".advancedsearch .filters").reset(), e[o](".filter.dropdown .filterCount").forEach((e, t) => {
                            e.innerText = 3 == t ? "Default" : "All"
                        }), e[d](".advancedsearch .btn[type=submit]").click())
                    }), b && b.addEventListener("submit", e => {
                        e.preventDefault();
                        let i = new FormData(b),
                            l = [],
                            o = [];
                        for (let e of i.entries()) "" != e[1] && 0 != e[1].length && ("order" == e[0] ? o.push(e[1]) : l.push(e[1]));
                        ((e, i, l) => {
                            n.sort(t.postSitemapArr, i[0] || "Update");
                            let o = t.postSitemapArr;
                            e.length > 0 && (o = o.filter(t => e.every(e => t.label.some(t => t == e)))), t.postSitemapPage = c(o, r["max-perpage"]), new Pagination({
                                callback: function (i, l) {
                                    g(t.postSitemapPage, l - 1, a, e), m(s), t.postSitemapPage.length > 1 && s.appendChild(i)
                                }
                            }).createPage(t.postSitemapPage.length, 1)
                        })(l, o)
                    })
                })(), "AZ" == r["sitemap-type"] && (() => {
                    function i(e, t) {
                        return e.filter(e => {
                            let a = e.title.charAt(0);
                            if (t)
                                if ("." == t) {
                                    if (/[^\d\w\s]/g.test(a)) return !0
                                } else if ("0-9" == t) {
                                if (/[\d]/g.test(a)) return !0
                            } else if (/[A-Z]/gi.test(t) && t.toLowerCase() == a.toLowerCase()) return !0
                        })
                    }
                    n.sort(t.postSitemapArr, "A-Z");
                    let l, s = a[d](".listo"),
                        o = a,
                        p = Z.get("show"),
                        h = a[d](".lista"),
                        f = p ? i(t.postSitemapArr, p) : t.postSitemapArr,
                        u = new Pagination({
                            callback: function (e, a) {
                                l.length < 2 && (e.className = "pagination"), g(t.postSitemapPage, a - 1, s), m(o), o.appendChild(e)
                            }
                        });
                    t.postSitemapPage = c(f, r["max-perpage"]), l = t.postSitemapPage.length, u.createPage(l, 1), h && (() => {
                        for (let a = 0; a < h.children.length; a++) {
                            const l = h.children[a];
                            l.addEventListener("click", a => {
                                a.preventDefault();
                                let s = l.href.split("?show=")[1],
                                    n = i(t.postSitemapArr, s);
                                t.history.pushState({}, e.title, l.href), t.onpopstate = (() => {
                                    let a = new URLSearchParams(e.location.search).get("show"),
                                        l = a ? i(t.postSitemapArr, a) : t.postSitemapArr;
                                    t.postSitemapPage = c(l, r["max-perpage"]), u.createPage(t.postSitemapPage.length, 1)
                                }), t.postSitemapPage = c(n, r["max-perpage"]), u.createPage(t.postSitemapPage.length, 1)
                            })
                        }
                    })()
                })(), ["chapternav", "chapterlist"].some(e => e == r["sitemap-type"]) && (() => {
                    let l, s, n, o, c = "",
                        m = t.postSitemapArr.map(e => e.label.some(e => "Series" == e)).indexOf(!0),
                        h = t.postSitemapArr[m];
                    if (h && [R, B].forEach(e => {
                            e && (e.classList.add("act"), e.innerHTML = '<a href="' + h.link + '" title="' + h.title + '">' + h.title + "</a>")
                        }), "chapternav" == r["sitemap-type"] && h) try {
                        fetch(h.link).then(e => 200 == e.status)
                    } catch (e) {
                        console.log(e)
                    }
                    if (t.postSitemapArr.splice(m, 1), t.postSitemapArr.forEach((t, a, i) => {
                            let d = new URL(t.link).pathname == e.location.pathname ? a : -1,
                                p = t.title.match(config.regexChapter);
                            p && (p = p.join(" ")), !l && -1 != d && i[d - 1] && (l = i[d - 1]), !s && -1 != d && i[d + 1] && (s = i[d + 1]), !n && a == i.length - 1 && (n = t), !o && 0 == a && (o = t), "chapternav" == r["sitemap-type"] ? (c += '<option data-post-id="' + t.id + '" value="' + t.link + '"', -1 != d && (c += ' selected="selected"'), c += ">" + p + "</option>") : "chapterlist" == r["sitemap-type"] && (c += createHTML(t, r["sitemap-type"], p))
                        }), "chapterlist" == r["sitemap-type"]) {
                        let e, i, l = a.previousElementSibling,
                            s = l.previousElementSibling;
                        if (c && (a.children[0].innerHTML = c), n && (e = (n.title.match(config.regexChapter) || []).join(" ")), o && (i = (o.title.match(config.regexChapter) || []).join(" ")), e && i && (() => {
                                for (let t = 0; t < s.children.length; t++) {
                                    let a = s.children[t].children[0];
                                    a.href = [n, o][t].link, a.children[1].innerText = [e, i][t]
                                }
                                s.classList.remove("h")
                            })(), t.postSitemapArr.length > 2) {
                            function g(e, t) {
                                for (let a = 0; a < e.length; a++) t(e[a], a, e)
                            }
                            l.classList.remove("h"), l.children[0].addEventListener("keyup", e => {
                                b && b.remove();
                                let t = e.currentTarget,
                                    i = a.children[0],
                                    l = i.children,
                                    s = t.value;
                                if (s.length < 1) g(l, e => e.style.display = "");
                                else {
                                    let e = 0;
                                    g(l, e => e.style.display = "none"), g(l, t => {
                                        t.hasAttribute("data-num") && -1 !== t.getAttribute("data-num").indexOf(s) && (t.style.display = "", e++)
                                    }), b && (e < 1 ? i.appendChild(b) : b.remove())
                                }
                            })
                        }
                    } else "chapternav" == r["sitemap-type"] && p.forEach(e => {
                        let a = e[d]("[name*=chapter]"),
                            r = e[d]("a.ch-prev-btn"),
                            n = e[d]("a.ch-next-btn"),
                            o = [s, l];
                        [r, n].forEach((e, l) => {
                            if (e) {
                                let s = o[l];
                                o[l] ? (e.dataset.id = s.id, e.href = s.link, e.classList.remove("disabled")) : e.classList.add("disabled"), e.addEventListener("click", l => {
                                    if (l.preventDefault(), e.dataset.id || e.dataset.valueIndex) {
                                        let l, s = v ? v.selectedIndex : 0,
                                            r = e.dataset.valueIndex;
                                        for (let t = 0; t < a.options.length; t++)
                                            if (a.options[t].dataset.postId == e.dataset.id) {
                                                l = a.options[t];
                                                break
                                            } if (1 == s && r && u[0]) u[0].selectedIndex = r, u[0].dispatchEvent(new Event("change"));
                                        else {
                                            if (e.classList.contains("disabled")) return;
                                            localStorage.setItem("x-sitemap", JSON.stringify(i)), t.location.assign(e.href)
                                        }
                                    }
                                })
                            }
                        }), a && (a.innerHTML = a.innerHTML + c, a.addEventListener("change", () => {
                            let e = a.value;
                            0 != e.length && (localStorage.setItem("x-sitemap", JSON.stringify(i)), t.location.assign(e))
                        }))
                    })
                })()
            })
        })()
    })(document, window);
})(document, window);
/*]]>*/
