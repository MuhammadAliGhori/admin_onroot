import Link from "next/link";
import { useContext } from "react";
import React from "react";
import { DataContext } from "./DataContext";

export default function HomePage() {
  const { data, recommendation, trips } = useContext(DataContext);
  return (
    <div>
      <div class="homepage_hero">
        <h1 className="text-center fw-bold pb-3">Admin Pannel</h1>
        <div class="w-100 d-flex justify-content-between gap-lg-4 gap-3">
          <div className="px-3 py-5 rounded-3 oned">
            <Link
              href="/recommendation"
              className="text-decoration-none text-dark"
            >
              <h6 class="fw-bold">
                Total Recommendation : {recommendation.length}
              </h6>
            </Link>
          </div>
          <div className="px-3 py-5 rounded-3 twod">
            <Link href="/userlist" className="text-decoration-none text-dark">
              <h6 class="fw-bold">Total Users : {data.users.length} </h6>
            </Link>
          </div>
          <div className="px-3 py-5 rounded-3 threed">
            <Link href="/trips" className="text-decoration-none text-dark">
              <h6 class="fw-bold">Total Trips : {trips.length} </h6>
            </Link>
          </div>
          <div className="px-3 py-5 rounded-3 fourd">4</div>
        </div>
      </div>
    </div>
  );
}
