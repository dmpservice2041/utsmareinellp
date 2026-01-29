module.exports = [
"[project]/marinellpnew/apps/frontend/src/config/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Configuration
 * Uses environment variables with fallback to defaults
 */ __turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS,
    "getUploadUrl",
    ()=>getUploadUrl
]);
const getBackendUrl = ()=>{
    // In Next.js, environment variables prefixed with NEXT_PUBLIC_ are available on the client
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Server-side: use environment variable or default
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
};
const API_BASE_URL = getBackendUrl();
const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
    CHANGE_EMAIL: `${API_BASE_URL}/api/auth/change-email`,
    GET_CURRENT_USER: `${API_BASE_URL}/api/auth/me`,
    ENABLE_2FA: `${API_BASE_URL}/api/auth/2fa/enable`,
    VERIFY_2FA_SETUP: `${API_BASE_URL}/api/auth/2fa/verify-setup`,
    DISABLE_2FA: `${API_BASE_URL}/api/auth/2fa/disable`,
    GET_2FA_STATUS: `${API_BASE_URL}/api/auth/2fa/status`,
    // Admin Dashboard
    DASHBOARD_STATS: `${API_BASE_URL}/api/admin/dashboard/stats`,
    // Products (New Arrivals)
    PRODUCTS: `${API_BASE_URL}/api/admin/new-arrivals`,
    PRODUCT: (id)=>`${API_BASE_URL}/api/admin/new-arrivals/${id}`,
    // Blogs
    BLOGS: `${API_BASE_URL}/api/admin/blogs`,
    BLOG: (id)=>`${API_BASE_URL}/api/admin/blogs/${id}`,
    // Media
    MEDIA: `${API_BASE_URL}/api/admin/media`,
    MEDIA_UPLOAD: `${API_BASE_URL}/api/admin/media/upload`,
    MEDIA_ITEM: (id)=>`${API_BASE_URL}/api/admin/media/${id}`,
    // Public
    PUBLIC_PRODUCTS: `${API_BASE_URL}/api/new-arrivals`,
    PUBLIC_PRODUCT_BY_SLUG: (slug)=>`${API_BASE_URL}/api/new-arrivals/${slug}`,
    PUBLIC_BLOGS: `${API_BASE_URL}/api/blogs`,
    PUBLIC_BLOG_BY_SLUG: (slug)=>`${API_BASE_URL}/api/blogs/${slug}`,
    // Contact
    CONTACT: `${API_BASE_URL}/api/contact`
};
const getUploadUrl = (path)=>{
    if (!path) return '';
    // If path already starts with http, return as is (decode first to avoid double encoding)
    if (path.startsWith('http://') || path.startsWith('https://')) {
        try {
            const url = new URL(path);
            // Decode and re-encode to normalize, but don't double encode
            const decodedPath = decodeURIComponent(url.pathname);
            url.pathname = decodedPath.split('/').map((segment)=>encodeURIComponent(segment)).join('/');
            return url.toString();
        } catch  {
            return path;
        }
    }
    // Otherwise, prepend backend URL and encode the path segments
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    // Decode first to avoid double encoding, then encode each segment
    const decodedPath = decodeURIComponent(cleanPath);
    const encodedPath = decodedPath.split('/').map((segment)=>{
        // Don't encode empty segments (double slashes)
        if (!segment) return '';
        return encodeURIComponent(segment);
    }).join('/');
    return `${API_BASE_URL}${encodedPath}`;
};
}),
"[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marinellpnew/apps/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marinellpnew/apps/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marinellpnew/apps/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marinellpnew/apps/frontend/src/config/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ProductCard({ title, image, category, slug }) {
    // Check if image exists and is not empty
    const hasImage = image && image.trim() !== '' && !image.includes('placehold.co');
    // Determine image URL: if it's a public folder path (starts with / and not /uploads), use it directly
    // Otherwise, use getUploadUrl for backend-uploaded images
    let imageUrl = null;
    if (hasImage) {
        if (image.startsWith('/') && !image.startsWith('/uploads')) {
            // Public folder image - use directly
            imageUrl = image;
        } else {
            // Backend-uploaded image - use getUploadUrl
            imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUploadUrl"])(image);
        }
    }
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (imgRef.current) {
            const img = imgRef.current;
            const handleError = ()=>{
                setImageError(true);
                img.style.display = 'none';
            };
            img.addEventListener('error', handleError);
            return ()=>img.removeEventListener('error', handleError);
        }
    }, [
        imageUrl
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-64 bg-white overflow-hidden flex items-center justify-center p-4",
                children: [
                    hasImage && imageUrl && !imageError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        ref: imgRef,
                        src: imageUrl,
                        alt: `${title} - ${category} - UTS Marine LLP`,
                        className: "max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105",
                        loading: "lazy",
                        decoding: "async"
                    }, void 0, false, {
                        fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `no-image-placeholder absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ${hasImage && imageUrl && !imageError ? 'hidden' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-16 h-16 text-gray-400 mb-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 1.5,
                                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                }, void 0, false, {
                                    fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                                    lineNumber: 61,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-gray-500",
                                children: "No Image"
                            }, void 0, false, {
                                fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                                lineNumber: 63,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-1",
                                children: "Available"
                            }, void 0, false, {
                                fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute top-4 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded z-10",
                        children: category
                    }, void 0, false, {
                        fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-gray-900 mb-2 truncate",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/products/${slug}`,
                        className: "inline-block text-sm font-semibold text-teal-600 hover:text-teal-800",
                        children: "View Details →"
                    }, void 0, false, {
                        fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                        lineNumber: 72,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ProductCard.tsx",
        lineNumber: 46,
        columnNumber: 9
    }, this);
}
}),
"[project]/marinellpnew/apps/frontend/src/components/shared/ScrollReveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marinellpnew/apps/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/marinellpnew/apps/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ScrollReveal({ children, delay = 0, className = '' }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    setTimeout(()=>{
                        entry.target.classList.add('revealed');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return ()=>{
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [
        delay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$marinellpnew$2f$apps$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `scroll-reveal ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/marinellpnew/apps/frontend/src/components/shared/ScrollReveal.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=marinellpnew_apps_frontend_src_16f1674e._.js.map