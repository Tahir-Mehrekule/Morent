import { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import styles from "./Wishlist.module.scss";

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);

	const updateWishlist = () => {
		const storedCars = JSON.parse(localStorage.getItem("wishlist")) || [];
		setWishlist(storedCars);
	};

	useEffect(() => {
		updateWishlist();
	}, []);

	return (
		<div className={styles.wishlistContainer}>
			<div className={styles.wishlistHeader}>
				<div className={styles.innerContainer}>
					<h2 className={styles.wishlistTitle}>
						Wishlist ({wishlist.length}
						{wishlist.length > 1 ? "" : ""})
					</h2>
				</div>
			</div>
			{wishlist.length === 0 ? (
				<p className={styles.wishlistTitleBefore}>Your wishlist is empty.</p>
			) : (
				<>
					<div className={styles.wishlistGrid}>
						{wishlist.map((car) => (
							<ProductCard
								key={car.id}
								name={car.name}
								category={car.category}
								fuelCapacity={car.fuelCapacity}
								transmission={car.transmission}
								peopleCap={car.peopleCap}
								productPrice={car.productPrice}
								discount={car.discount}
								carImg={car.carImg}
								likedState={true}
								onWishlistChange={updateWishlist}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Wishlist;
