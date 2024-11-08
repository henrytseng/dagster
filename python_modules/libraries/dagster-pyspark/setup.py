from pathlib import Path
from typing import Dict

from setuptools import find_packages, setup


def get_version() -> str:
    version: Dict[str, str] = {}
    with open(Path(__file__).parent / "dagster_pyspark/version.py", encoding="utf8") as fp:
        exec(fp.read(), version)

    return version["__version__"]


ver = get_version()
# dont pin dev installs to avoid pip dep resolver issues
pin = "" if ver == "1!0+dev" else f"=={ver}"
setup(
    name="dagster-pyspark",
    version=ver,
    author="Dagster Labs",
    author_email="hello@dagsterlabs.com",
    license="Apache-2.0",
    description="Package for PySpark Dagster framework components.",
    url=(
        "https://github.com/dagster-io/dagster/tree/master/python_modules/dagster-framework/pyspark"
    ),
    classifiers=[
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
    ],
    packages=find_packages(exclude=["dagster_pyspark_tests*"]),
    include_package_data=True,
    python_requires=">=3.9,<3.13",
    install_requires=[
        "dagster==1.9.1",
        "dagster_spark==0.25.1",
        "pyspark>=3",
    ],
    zip_safe=False,
)
