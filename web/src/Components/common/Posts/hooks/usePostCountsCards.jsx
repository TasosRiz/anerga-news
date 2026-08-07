import { useEffect, useState } from "react";
import {
    BiClipboard,
    BiCheckCircle,
    BiHide,
    BiX,
} from "react-icons/bi";

import { fetchPostCounts } from "../api/PostsApi";

export const usePostCountsCards = ({ token }) => {
    const [counts, setCounts] = useState(null);
    const [loadingCounts, setLoadingCounts] = useState(true);
    const [countsError, setCountsError] = useState("");

    const basePath = "/admin/dashboard/posts";

    useEffect(() => {
        const loadCounts = async () => {
            try {
                setLoadingCounts(true);
                setCountsError("");

                const data = await fetchPostCounts(token);

                setCounts(data);
            } catch (err) {
                setCountsError(err.message);
            } finally {
                setLoadingCounts(false);
            }
        };

        if (token) loadCounts();
    }, [token]);

    const cards = [
        {
            title: "Σύνολο Ανακοινώσεων",
            value: counts?.total ?? 0,
            icon: <BiClipboard />,
            color: "#526D82",
            bgColor: "#eaf0f4",
            clickable: false,
        },
        {
            title: "Νέες",
            value: counts?.new ?? 0,
            icon: <BiCheckCircle />,
            color: "#1b9b78",
            bgColor: "#d8f7ef",
            clickable: false,
        },
        {
            title: "Ανενεργές ",
            value: counts?.inactive ?? 0,
            icon: <BiX />,
            color: "#9b391b",
            bgColor: "#d47b5a",
            clickable: false,
        },

    ];

    return {
        counts,
        cards,
        loadingCounts,
        countsError,
    };
};